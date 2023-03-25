import { Request, Response } from "express";
import Controller from "./Controller";

class BaseController extends Controller {
	protected initializeRoutes(): void {
		this.router.get("/", this.getBase.bind(this));
	}

	private async getBase(req: Request, res: Response): Promise<void> {
		this.successResponse(
			res,
			"Welcome to the FoodFlow API! Please refer to the API documentation for usage instructions."
		);
	}
}

export default BaseController;
