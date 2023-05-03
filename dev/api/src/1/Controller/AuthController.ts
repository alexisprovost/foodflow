import passport from "passport";
import jwt from "jsonwebtoken";
import Controller from ".";

import UserDao from "../DAO/UserDao";
import WalletDao from "../DAO/WalletDAO";

import { configureJwtStrategy, jwtRoutes } from "../Strategies/JWT";
import { configureLocalStrategy } from "../Strategies/Local";

class AuthController extends Controller {
	private accessTokenExpiresInStr = process.env.ACCESS_TOKEN_EXPIRES;
	private refreshTokenExpiresInStr = process.env.REFRESH_TOKEN_EXPIRES;

	public userDao: UserDao;
	public walletDao: WalletDao;
	public accessTokenExpiresIn;
	public refreshTokenExpiresIn;

	constructor() {
		super();
		this.userDao = new UserDao();
		this.walletDao = new WalletDao();
		this.accessTokenExpiresIn = this.accessTokenExpiresInStr ? parseInt(this.accessTokenExpiresInStr, 10) : 3600;
		this.refreshTokenExpiresIn = this.refreshTokenExpiresInStr ? parseInt(this.refreshTokenExpiresInStr, 10) : 604800;

		// Configure strategies
		passport.use(configureJwtStrategy(this.userDao));
		passport.use(configureLocalStrategy(this.userDao));
	}

	protected initializeRoutes(): void {
		jwtRoutes(this.router, this);
	}

	public async generateRefreshToken(user: any): Promise<{ refreshToken: string; expires: Date }> {
		const expiresIn = this.refreshTokenExpiresIn;
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
		const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: this.accessTokenExpiresIn });
		const { refreshToken, expires: refreshExpiresAtDate } = await this.generateRefreshToken(user);
		const expires = new Date(Date.now() + this.accessTokenExpiresIn * 1000);
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
