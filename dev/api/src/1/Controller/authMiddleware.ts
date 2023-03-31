import { Request, Response, NextFunction } from "express";
import passport from "passport";
import passportJwt from "passport-jwt";

import UserDao from "../DAO/UserDao";

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
        if (!user) {
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
