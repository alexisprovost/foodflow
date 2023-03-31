import { Request, Response } from "express";
import Controller from ".";
import UserDao from "../../DAO/UserDao";

import { requireAuth } from "./authMiddleware";

class UserController extends Controller {
	private userDao: UserDao;

	constructor() {
		super();
		this.userDao = new UserDao();
	}

	protected initializeRoutes(): void {
		this.router.get("/", requireAuth, this.getUser.bind(this));
	}

	private async getUser(req: Request, res: Response): Promise<void> {
		const user: any = req.user;

		try {
			const userInfos = await this.userDao.getUserById(parseInt(user.id));
			if (!userInfos) {
				return super.errorResponse(res, "User not found", 404);
			}

			super.successResponse(res, userInfos);
		} catch (err) {
			console.error("Error getting user:", err);
			super.errorResponse(res, "Internal server error", 500);
		}
	}
}

export default UserController;
