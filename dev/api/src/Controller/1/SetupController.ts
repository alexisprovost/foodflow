import { Request, Response } from "express";
import Controller from ".";
import SetupDAO from "../../DAO/SetupDAO";

class SetupController extends Controller {
	private db: SetupDAO;

	constructor() {
		super();
		this.db = new SetupDAO();
	}

	protected initializeRoutes(): void {
		this.router.get("/", this.setup.bind(this));
	}

	private async setup(req: Request, res: Response): Promise<void> {
		try {
			await this.db.CreateTablesIfNotExist();
			this.successResponse(res, "Success");
		} catch (err) {
			console.error("Error creating table:", err);
			this.errorResponse(res, "Internal server error", 500);
		}
	}
}

export default SetupController;
