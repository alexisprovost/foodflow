import passport from "passport";
import jwt from "jsonwebtoken";
import Controller from ".";

import UserDao from "../DAO/UserDao";

import { configureJwtStrategy, jwtRoutes } from "../Strategies/JWT";
import { configureLocalStrategy } from "../Strategies/Local";

class AuthController extends Controller {
	public userDao: UserDao;
	public expiresIn;

	constructor() {
		super();
		this.userDao = new UserDao();
		this.expiresIn = process.env.REFRESH_TOKEN_EXPIRES || "3600";

		// Configure strategies
		passport.use(configureJwtStrategy(this.userDao));
		passport.use(configureLocalStrategy(this.userDao));
	}

	protected initializeRoutes(): void {
		jwtRoutes(this.router, this);
	}

	public async generateRefreshToken(user: any): Promise<{ refreshToken: string; expires: Date }> {
		const expiresIn = parseInt(this.expiresIn, 10);
		const expires = new Date(Date.now() + expiresIn * 1000);
		const payload = {
			sub: user.id,
			type: "refresh",
		};
		const options = {
			expiresIn: expiresIn, // or any desired duration
		};
		const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, options);
		return { refreshToken, expires };
	}

	public async generateAuthToken(user: any): Promise<{ token: string; refreshToken: string; expires: Date }> {
		const payload = { sub: user.id };
		const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: this.expiresIn });
		const { refreshToken, expires: refreshExpiresAtDate } = await this.generateRefreshToken(user);
		const expires = new Date(Date.now() + parseInt(this.expiresIn, 10) * 1000);
		return { token, refreshToken, expires };
	}

	public async getUserIdFromRefreshToken(refreshToken: string): Promise<number | null> {
		try {
			const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { sub: string | number };

			// check if the id is a number
			if (isNaN(decodedToken.sub as number)) {
				return null;
			}
			return decodedToken.sub as number;
		} catch (err) {
			return null;
		}
	}
}

export default AuthController;
