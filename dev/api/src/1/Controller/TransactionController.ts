import { Request, Response } from "express";
import Controller from ".";
import ProductDao from "../DAO/ProductDAO";
import TransactionDAO from "../DAO/TransactionDAO";

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
    this.router.get("/:id", this.handleAsync(this.getTransactionsByUserId.bind(this)));
    this.router.get("/single/:id", this.handleAsync(this.getTransactionById.bind(this)));
    this.router.post("/", this.handleAsync(this.createTransaction.bind(this)));
    this.router.delete("/:id", this.handleAsync(this.deleteTransaction.bind(this)));
  }

  private async getTransactionsByUserId(req: Request, res: Response): Promise<void> {
	const { id } = req.params;
    const transactions = await this.transactionDao.getTransactionsByUserId(Number(id));
    res.json(transactions);
  }

  private async getTransactionById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const transaction = await this.transactionDao.getTransactionById(Number(id));
    res.json(transaction);
  }

  private async createTransaction(req: Request, res: Response): Promise<void> {
    const transactionData = req.body;
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
