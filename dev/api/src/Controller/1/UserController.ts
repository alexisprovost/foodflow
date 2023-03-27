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
		this.router.get("/", requireAuth, this.handleAsync(this.getUser));
	}

	private async getUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    try {
      const user = await this.userDao.getUserById(parseInt(userId));
      if (!user) {
        return this.errorResponse(res, "User not found", 404);
      }

      this.successResponse(res, user);
    } catch (err) {
      console.error("Error getting user:", err);
      this.errorResponse(res, "Internal server error", 500);
    }
	}
}

export default UserController;
