import { Request, Response } from "express";
import Controller from ".";
import UserDao from "../../DAO/UserDao";

import Utils from "./Utils";

class UserController extends Controller {
	private readonly userDao: UserDao;

	constructor() {
		super();
		this.userDao = new UserDao();
	}

	protected initializeRoutes(): void {
		
	}

	private async getUser(req: Request, res: Response): Promise<void> {
		const user = await this.userDao.getUserById(parseInt(req.params.id, 10));
		this.successResponse(res, user);
	}
}

export default UserController;
