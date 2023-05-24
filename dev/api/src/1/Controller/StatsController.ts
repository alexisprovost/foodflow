/**
 * ============================================
 * Filename: StatsController.ts
 * Author(s): Thomas Pelletier, Alexis Provost
 * Description: This file contains the logic for the stats controller. It is used to handle all requests related to statistics.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */
import { Request, Response } from "express";
import Controller from ".";
import StatsDAO from "../DAO/StatsDAO";
import { requireAuth, requireRole } from "./authMiddleware";

class StatsController extends Controller {
	private statisticsDao: StatsDAO;

	constructor() {
		super();
		this.statisticsDao = new StatsDAO();
		this.useJsonBodyParser();
	}

	protected initializeRoutes(): void {
		this.router.get("/top-three-products", requireAuth, requireRole(90), this.handleAsync(this.getTopThreeProducts.bind(this)));
		this.router.get("/bottom-three-products", requireAuth, requireRole(90), this.handleAsync(this.getBottomThreeProducts.bind(this)));
		this.router.get("/total-sales", requireAuth, requireRole(90), this.handleAsync(this.getTotalSales.bind(this)));
	}

	private async getTopThreeProducts(req: Request, res: Response): Promise<void> {
		const result = await this.statisticsDao.getTopThreeProducts();
		this.successResponse(res, result);
	}

	private async getBottomThreeProducts(req: Request, res: Response): Promise<void> {
		const result = await this.statisticsDao.getBottomThreeProducts();
		this.successResponse(res, result);
	}

	private async getTotalSales(req: Request, res: Response): Promise<void> {
		const totalSales = await this.statisticsDao.getTotalSales();
		this.successResponse(res, totalSales);
	}
}

export default StatsController;
