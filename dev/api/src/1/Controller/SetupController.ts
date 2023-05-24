import { Request, Response } from "express";
import Controller from ".";
import SetupDAO from "../DAO/SetupDAO";

class SetupController extends Controller {
	private db: SetupDAO;

	constructor() {
		super();
		this.db = new SetupDAO();
	}

	protected initializeRoutes(): void {
		this.router.get("/", this.setup.bind(this));
		this.router.get("/add-samples", this.addSampleData.bind(this));
	}

	private async setup(req: Request, res: Response): Promise<void> {
		await this.db.CreateTablesIfNotExist();
		return this.successResponse(res, "Success");
	}

	private async addSampleData(req: Request, res: Response): Promise<void> {
		await this.db.addSampleData();
		return this.successResponse(res, "Success");
	}
}

export default SetupController;
