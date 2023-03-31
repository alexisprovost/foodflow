import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";
import Controller from ".";

import Utils from "./Utils";

import UserDao from "../DAO/UserDao";

const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

class AuthController extends Controller {
	private userDao: UserDao;

	constructor() {
		super();
		this.userDao = new UserDao();

		// Configure the JWT strategy
		passport.use(
			new JwtStrategy(
				{
					jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
					secretOrKey: process.env.JWT_SECRET as string,
				},
				async (payload, done) => {
					try {
						const user = await this.userDao.getUserById(payload.sub);
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
			)
		);

		// Configure the Local strategy
		passport.use(
			new LocalStrategy(
				{
					usernameField: "email",
					passwordField: "password",
				},
				async (email, password, done) => {
					try {
						const user: any = await this.userDao.getUserByEmail(email);
						const isValidPassword = await Utils.comparePassword(password, user.password);
						if (!user || !isValidPassword) {
							return done(null, false);
						}

						return done(null, user);
					} catch (err) {
						console.error("Error authenticating user:", err);
						return done(err, false);
					}
				}
			)
		);
	}

	protected initializeRoutes(): void {
		this.router.post("/login", this.handleLogin.bind(this));
		this.router.post("/register", this.handleRegister.bind(this));
	}

	private async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
		// Use the Local strategy to authenticate the user
		passport.authenticate("local", { session: false }, async (err: any, user: any, info: any) => {
			if (err) {
				console.error("Error authenticating user:", err);
				return this.errorResponse(res, "Internal server error", 500);
			}

			if (!user) {
				return this.errorResponse(res, "Invalid username or password", 401);
			}

			try {
				const token = await this.generateAuthToken(user);
				this.successResponse(res, token);
			} catch (err) {
				console.error("Error generating auth token:", err);
				this.errorResponse(res, "Internal server error", 500);
			}
		})(req, res, next);
	}

	private async handleRegister(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		try {
			const user = await this.userDao.getUserByEmail(email);
			if (user) {
				return this.errorResponse(res, "User already exists", 409);
			}

			const newUser = await this.userDao.createUser(email, password);
			const token = await this.generateAuthToken(newUser);

			this.successResponse(res, token);
		} catch (err) {
			console.error("Error creating user:", err);
			this.errorResponse(res, "Internal server error", 500);
		}
	}

	private async generateAuthToken(user: any): Promise<{ token: string; expires: Date }> {
		const payload = { sub: user.id };
		const expiresIn = "1h";
		const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
		const expires = new Date(Date.now() + parseInt(expiresIn, 10) * 1000); // Convert expiresIn to milliseconds
		return { token, expires };
	}
}

export default AuthController;
