/**
 * ============================================
 * Filename: UserController.ts
 * Author(s): Thomas Pelletier, Alexis Provost
 * Description: This file contains the logic for the user controller. It is used to handle all requests related to users.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */
import { Request, Response } from "express";
import Controller from ".";
import UserDao from "../DAO/UserDao";

import { requireAuth, requireRole } from "./authMiddleware";

class UserController extends Controller {
	private userDao: UserDao;

	constructor() {
		super();
		this.userDao = new UserDao();
	}

	protected initializeRoutes(): void {
		this.router.get("/", requireAuth, this.handleAsync(this.getUser.bind(this)));
		this.router.put("/:id", requireAuth, this.handleAsync(this.updateUser.bind(this)));
		this.router.delete("/:id", requireAuth, this.handleAsync(this.deleteUser.bind(this)));
	}

	private async getUser(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const userInfos = await this.userDao.getUserById(parseInt(user.id));

		if (!userInfos) {
			return super.errorResponse(res, "User not found", 404);
		}

		return super.successResponse(res, userInfos);
	}

	private async updateUser(req: Request, res: Response): Promise<void> {
		const userid: number = parseInt(req.params.id);
		const updateData = req.body;
		const user: any = req.user;

		//verify that the connected user is the same as the one being updated
		if (user.id !== userid) {
			return super.errorResponse(res, "Unauthorized", 401);
		}

		const userInfos = await this.userDao.updateUser(userid, updateData);

		if (!userInfos) {
			return super.errorResponse(res, "User not found", 404);
		}

		return super.successResponse(res, userInfos);
	}

	private async deleteUser(req: Request, res: Response): Promise<void> {
		const userid: number = parseInt(req.params.id);
		const user: any = req.user;

		//verify that the connected user is the same as the one being updated
		if (user.id !== userid) {
			return super.errorResponse(res, "Unauthorized", 401);
		}

		const deleteUser = await this.userDao.deleteUser(userid);

		if (!deleteUser) {
			return super.errorResponse(res, "No Deletion", 404);
		}

		return super.successResponse(res, deleteUser);
	}
}

export default UserController;
