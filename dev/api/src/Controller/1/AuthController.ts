import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import Controller from ".";
import UserDao from "../../DAO/UserDao";

class AuthController extends Controller {
	private userDao: UserDao;

	constructor() {
		super();
		this.userDao = new UserDao();
	}

	protected initializeRoutes(): void {
		this.router.post("/login", this.handleLogin.bind(this));
	}

	private async handleLogin(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		try {
			const user = await this.userDao.getUserByEmail(email);
			if (!user) {
				return this.errorResponse(res, "Invalid username or password", 401);
			}

			passport.authenticate("local", { session: false }, async (err: any, user: any) => {
				if (err) {
					console.error("Error authenticating user:", err);
					return this.errorResponse(res, "Internal server error", 500);
				}

				if (!user) {
					return this.errorResponse(res, "Invalid username or password", 401);
				}

				try {
					const token = await this.generateAuthToken(user);
					this.successResponse(res, { token });
				} catch (err) {
					console.error("Error generating auth token:", err);
					this.errorResponse(res, "Internal server error", 500);
				}
			})(req, res);
		} catch (err) {
			console.error("Error getting user:", err);
			this.errorResponse(res, "Internal server error", 500);
		}
	}

	private async generateAuthToken(user: any): Promise<string> {
		const payload = { sub: user.id };
		const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });
		return token;
	}
}

export default AuthController;
