import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import passportJwt from "passport-jwt";
import UserDao from "../DAO/UserDao";
import { User } from "../DAO/UserDao";
import Controller from "../Controller";
import AuthController from "../Controller/AuthController";

import Utils from "../Controller/Utils";

const JwtStrategy = passportJwt.Strategy;

export function configureJwtStrategy(userDao: UserDao) {
	return new JwtStrategy(
		{
			jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET as string,
		},
		async (payload, done) => {
			try {
				const user: User = await userDao.getUserById(payload.sub);
				if (!user) {
					return done(null, false);
				}

				// Add the id property to the user object
				user.id = payload.sub;

				return done(null, user);
			} catch (err) {
				console.error("Error authenticating user:", err);
				return done(err, false);
			}
		}
	);
}

export function jwtRoutes(router: Router, authController: AuthController): void {
	router.post("/login", authController.handleAsync((req: any, res: any, next: any) => handleLogin(req, res, next, authController)).bind(authController));
	router.post("/register", authController.handleAsync((req: any, res: any) => handleRegister(req, res, authController)).bind(authController));
	router.post("/refresh", authController.handleAsync((req: any, res: any, next: any) => handleRefreshToken(req, res, authController)).bind(authController));
}

async function handleLogin(req: Request, res: Response, next: NextFunction, controller: Controller): Promise<void> {
	passport.authenticate("local", { session: false }, async (err: any, user: any, info: any) => {
		if (err) {
			console.error("Error authenticating user:", err);
			return controller.errorResponse(res, "Internal server error", 500);
		}

		if (!user) {
			return controller.errorResponse(res, "Invalid username or password", 401);
		}

		try {
			const token = await (controller as AuthController).generateAuthToken(user);
			controller.successResponse(res, token);
		} catch (err) {
			console.error("Error generating auth token:", err);
			controller.errorResponse(res, "Internal server error", 500);
		}
	})(req, res, next);
}

async function handleRegister(req: Request, res: Response, authController: AuthController): Promise<void> {
	const { email, password } = req.body;

	try {
		const user = await authController.userDao.getUserByEmail(email);
		if (user) {
			return authController.errorResponse(res, "User already exists", 409);
		}

		const newUser = await authController.userDao.createUser(email, password);
		await authController.walletDao.createWallet(newUser.id);

		const token = await authController.generateAuthToken(newUser);

		const expiresIn = (token.expires.getTime() - Date.now()) / 1000;

		authController.userDao.saveRefreshToken(newUser.id, token.refreshToken, expiresIn);

		authController.successResponse(res, token);
	} catch (err) {
		console.error("Error creating user:", err);
		authController.errorResponse(res, "Internal server error", 500);
	}
}

async function handleRefreshToken(req: Request, res: Response, controller: AuthController): Promise<void> {
	const { refreshToken } = req.body;
	const userDao = new UserDao();

	if (!refreshToken) {
		return controller.errorResponse(res, "Refresh token is missing", 400);
	}

	try {
		const userId = await controller.getUserIdFromRefreshToken(refreshToken);

		if (!userId) {
			return controller.errorResponse(res, "Invalid refresh token", 401);
		}

		const user = await userDao.getRefreshTokenbyUserId(userId);

		if (!user) {
			return controller.errorResponse(res, "Invalid refresh token", 401);
		}

		const isTokenMatch = user.refresh_token && typeof user.refresh_token === "string" ? await Utils.compareHash(refreshToken, user.refresh_token) : false;

		if (!isTokenMatch) {
			return controller.errorResponse(res, "Invalid refresh token", 401);
		}

		const newTokens = await (controller as AuthController).generateAuthToken(user);

		// Calculate expiresIn in seconds
		const expiresIn = (newTokens.expires.getTime() - Date.now()) / 1000;

		await userDao.saveRefreshToken(user.id, newTokens.refreshToken, expiresIn);

		return controller.successResponse(res, newTokens);
	} catch (err) {
		console.error("Error handling refresh token:", err);
		controller.errorResponse(res, "Internal server error", 500);
	}
}
