import { Router, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";

abstract class Controller {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	protected abstract initializeRoutes(): void;

	protected successResponse(res: Response, data: any): void {
		res.status(200).json({
			status: "success",
			data,
		});
	}

	protected errorResponse(res: Response, message: string, status: number): void {
		res.status(status).json({
			status: "error",
			message,
		});
	}

	protected handleAsync(fn: Function) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				await fn(req, res, next);
			} catch (err) {
				console.error("Error handling request:", err);
				this.errorResponse(res, "Internal server error", 500);
			}
		};
	}

	// Add this method to parse JSON data in request body
	protected useJsonBodyParser(): void {
		this.router.use(bodyParser.json());
	}
}

export default Controller;
