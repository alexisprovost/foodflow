import express, { Router, Response, Request, NextFunction } from "express";

/**
 * ============================================
 * Filename: index.ts
 * Author(s): Alexis Provost, Thomas Pelletier
 * Description: This file contains the logic for the base controller class. It gives the structure for all controllers.
 * Sources: 
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * 2. Passport.js: http://www.passportjs.org/docs/
 * ============================================
 */

abstract class Controller {
	public router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	protected abstract initializeRoutes(): void;

	public successResponse(res: Response, data: any): void {
		res.status(200).json({
			status: "success",
			data,
		});
	}

	public errorResponse(res: Response, message: string, status: number): void {
		res.status(status).json({
			status: "error",
			message,
		});
	}

	public handleAsync(fn: Function) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				await fn(req, res, next);
			} catch (err) {
				console.error("Error handling request:", err);
				this.errorResponse(res, "Internal server error", 500);
			}
		};
	}

	// This method is used to parse the request body as JSON
	protected useJsonBodyParser(): void {
		this.router.use(express.json());
	}
}

export default Controller;
