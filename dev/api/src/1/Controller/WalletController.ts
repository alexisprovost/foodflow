/**
 * ============================================
 * Filename: WalletController.ts
 * Author(s): Alexis Provost, Thomas Pelletier
 * Description: This file contains the logic for the wallet controller. It is used to handle all requests related to the wallet.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */
import { Request, Response } from "express";
import { isNumber } from "util";
import Controller from ".";
import WalletDao from "../DAO/WalletDAO";

import { requireAuth, requireRole } from "./authMiddleware";

class WalletController extends Controller {
	private walletDao: WalletDao;

	constructor() {
		super();
		this.walletDao = new WalletDao();
	}

	protected initializeRoutes(): void {
		this.router.get("/balance", requireAuth, this.handleAsync(this.getBalance.bind(this)));
		this.router.post("/add", requireAuth, requireRole(90), this.handleAsync(this.addMoney.bind(this)));
		this.router.put("/:id/balance", requireAuth, requireRole(90), this.handleAsync(this.changeBalance.bind(this)));
		this.router.post("/withdraw", requireAuth, this.handleAsync(this.withdrawMoney.bind(this)));
		this.router.post("/tip", requireAuth, this.handleAsync(this.tipMoney.bind(this)));
	}

	private async getBalance(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const balance = await this.walletDao.getBalance(user.id);
		return super.successResponse(res, { balance });
	}

	private async addMoney(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const amount: number = parseFloat(req.body.amount);
		const newBalance = await this.walletDao.addMoney(user.id, amount);
		return super.successResponse(res, { balance: newBalance });
	}

	private async changeBalance(req: Request, res: Response): Promise<void> {
		const userId: number = parseInt(req.params.id);
		const newBalance: number = parseFloat(req.body.balance);
		if (!isNumber(newBalance)) {
			return super.errorResponse(res, "Invalid balance", 400);
		}

		const updatedBalance = await this.walletDao.setBalance(userId, newBalance);

		if (!updatedBalance) {
			return super.errorResponse(res, "User not found", 404);
		}

		return super.successResponse(res, { balance: updatedBalance });
	}

	private async withdrawMoney(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const amount: number = parseFloat(req.body.amount);
		const newBalance = await this.walletDao.withdrawMoney(user.id, amount);
		return super.successResponse(res, { balance: newBalance });
	}

	private async tipMoney(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const receiverId: number = parseInt(req.body.receiverId);
		const amount: number = parseFloat(req.body.amount);
		await this.walletDao.tipMoney(user.id, receiverId, amount);
		return super.successResponse(res, { message: "Money tipped successfully" });
	}
}

export default WalletController;
