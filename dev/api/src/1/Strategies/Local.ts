import passportLocal from "passport-local";
import UserDao from "../DAO/UserDao";
import Utils from "../Controller/Utils";

const LocalStrategy = passportLocal.Strategy;

export function configureLocalStrategy(userDao: UserDao) {
	return new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				const user: any = await userDao.getUserByEmail(email);
				const isValidPassword = await Utils.compareHash(password, user.password);
				if (!user || !isValidPassword) {
					return done(null, false);
				}

				return done(null, user);
			} catch (err) {
				console.error("Error authenticating user:", err);
				return done(err, false);
			}
		}
	);
}
