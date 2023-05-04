import { Request, Response } from "express";
import Controller from ".";
import ProductDao from "../DAO/ProductDAO";
import TransactionDAO from "../DAO/TransactionDAO";
import { requireAuth } from "./authMiddleware";

class TransactionController extends Controller {
	private productDao: ProductDao;
	private transactionDao: TransactionDAO;

	constructor() {
		super();
		this.productDao = new ProductDao();
		this.transactionDao = new TransactionDAO();
		this.useJsonBodyParser();
	}

	protected initializeRoutes(): void {
		this.router.get("/", requireAuth, this.handleAsync(this.getTransactionsByUserId.bind(this)));
		this.router.get("/single/:id", requireAuth, this.handleAsync(this.getTransactionById.bind(this)));
		this.router.post("/", requireAuth, this.handleAsync(this.createTransaction.bind(this)));
		//this.router.delete("/:id", this.handleAsync(this.deleteTransaction.bind(this)));
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

	private async createTransaction(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const transactionData = req.body;
		transactionData.user_id = user.id;
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
