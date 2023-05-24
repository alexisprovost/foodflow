import { Request, Response, NextFunction } from "express";
import passport from "passport";
import passportJwt from "passport-jwt";

import UserDao, { User } from "../DAO/UserDao";

/**
 * ============================================
 * Filename: authMiddleware.ts
 * Author(s): Alexis Provost
 * Description: This file contains the logic for the authentication middleware. It is used to authenticate users and check their roles.
 * Sources: 
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * 2. Passport.js: http://www.passportjs.org/docs/
 * ============================================
 */

const JwtStrategy = passportJwt.Strategy;

const userDao = new UserDao();

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET as string,
		},
		async (payload, done) => {
			try {
				const user = await userDao.getUserById(payload.sub);

				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (err) {
				console.error("Error authenticating user:", err);
				return done(err, false);
			}
		}
	)
);

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	passport.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
		if (err) {
			console.error("Error authenticating user:", err);
			return res.status(500).json({ message: "Internal server error" });
		}

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		req.user = user;
		next();
	})(req, res, next);
}

export function requireRole(role: number) {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.user || (req.user as User).role < role) {
			return res.status(403).json({ message: "Forbidden" });
		}
		next();
	};
}
