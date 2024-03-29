/**
 * ============================================
 * Filename: TransactionController.ts
 * Author(s): Thomas Pelletier, Alexis Provost
 * Description: This file contains the logic for the transaction controller. It is used to handle all requests related to transactions.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */
import { Request, Response } from "express";
import Controller from ".";
import ProductDao from "../DAO/ProductDAO";
import TransactionDAO from "../DAO/TransactionDAO";
import { requireAuth, requireRole } from "./authMiddleware";
import EmailService from "../Services/EmailServices";
import UserDao from "../DAO/UserDao";

class TransactionController extends Controller {
	private productDao: ProductDao;
	private transactionDao: TransactionDAO;
	private emailService: EmailService;
	private userDao: UserDao;

	constructor() {
		super();
		this.productDao = new ProductDao();
		this.transactionDao = new TransactionDAO();
		this.emailService = new EmailService();
		this.userDao = new UserDao();
		this.useJsonBodyParser();
	}

	protected initializeRoutes(): void {
		this.router.get("/", requireAuth, this.handleAsync(this.getTransactionsByUserId.bind(this)));
		this.router.get("/single/:id", requireAuth, this.handleAsync(this.getTransactionById.bind(this)));
		this.router.get("/all", requireAuth, requireRole(90), this.handleAsync(this.getAll.bind(this)));
		this.router.post("/", requireAuth, this.handleAsync(this.createTransaction.bind(this)));
		this.router.delete("/:id", requireAuth, requireRole(90), this.handleAsync(this.deleteTransaction.bind(this)));
	}

	private async getTransactionsByUserId(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const transactions = await this.transactionDao.getTransactionsByUserId(user.id);
		this.successResponse(res, transactions);
	}

	private async getTransactionById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const transaction = await this.transactionDao.getTransactionById(Number(id));
		this.successResponse(res, transaction);
	}

	private async getAll(req: Request, res: Response): Promise<void> {
		const transactions = await this.transactionDao.getAll();
		this.successResponse(res, transactions);
	}

	private async createTransaction(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const transactionData = req.body;
		transactionData.user_id = user.id;
		const getEmail = await this.userDao.getUserById(user.id);
		const email = getEmail.email;
		transactionData.products;

		this.emailService.send(email, "FoodFlow Purchase", "Thank you for your purchase!");
		const newTransaction = await this.transactionDao.createTransaction(transactionData);
		res.status(201).json(newTransaction);
	}

	private async deleteTransaction(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.transactionDao.deleteTransaction(Number(id));
		res.status(204).send();
	}
}

export default TransactionController;
