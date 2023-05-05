import { Request, Response } from "express";
import Controller from ".";
import WalletDao from "../DAO/WalletDAO";

import { requireAuth } from "./authMiddleware";

class WalletController extends Controller {
	private walletDao: WalletDao;

	constructor() {
		super();
		this.walletDao = new WalletDao();
	}

	protected initializeRoutes(): void {
		this.router.get("/balance", requireAuth, this.handleAsync(this.getBalance.bind(this)));
		this.router.post("/add", requireAuth, this.handleAsync(this.addMoney.bind(this)));
		this.router.post("/withdraw", requireAuth, this.handleAsync(this.withdrawMoney.bind(this)));
		this.router.post("/tip", requireAuth, this.handleAsync(this.tipMoney.bind(this)));
	}

	private async getBalance(req: Request, res: Response): Promise<void> {
		const user: any = req.user;

		try {
			const balance = await this.walletDao.getBalance(user.id);
			super.successResponse(res, { balance });
		} catch (err) {
			console.error("Error getting balance:", err);
			super.errorResponse(res, "Internal server error", 500);
		}
	}

	private async addMoney(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const amount: number = parseFloat(req.body.amount);

		try {
			const newBalance = await this.walletDao.addMoney(user.id, amount);
			super.successResponse(res, { balance: newBalance });
		} catch (err) {
			console.error("Error adding money:", err);
			super.errorResponse(res, "Internal server error", 500);
		}
	}

	private async withdrawMoney(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const amount: number = parseFloat(req.body.amount);

		try {
			const newBalance = await this.walletDao.withdrawMoney(user.id, amount);
			super.successResponse(res, { balance: newBalance });
		} catch (err) {
			console.error("Error withdrawing money:", err);
			super.errorResponse(res, "Internal server error", 500);
		}
	}

	private async tipMoney(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const receiverId: number = parseInt(req.body.receiverId);
		const amount: number = parseFloat(req.body.amount);

		try {
			await this.walletDao.tipMoney(user.id, receiverId, amount);
			super.successResponse(res, { message: "Money tipped successfully" });
		} catch (err) {
			console.error("Error tipping money:", err);
			super.errorResponse(res, "Internal server error", 500);
		}
	}
}

export default WalletController;
