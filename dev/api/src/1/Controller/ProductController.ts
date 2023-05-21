import { Request, Response } from "express";
import Controller from ".";
import ProductDao from "../DAO/ProductDAO";
import { requireAuth, requireRole } from "./authMiddleware";

class ProductController extends Controller {
	private productDao: ProductDao;

	constructor() {
		super();
		this.productDao = new ProductDao();
		this.useJsonBodyParser();
	}

	protected initializeRoutes(): void {
		this.router.get("/", this.handleAsync(this.getAllProducts.bind(this)));
		this.router.get("/:id", this.handleAsync(this.getProductById.bind(this)));
		this.router.post("/", this.handleAsync(this.createProduct.bind(this)));
		this.router.put("/:id", this.handleAsync(this.updateProduct.bind(this)));
		this.router.delete("/:id", this.handleAsync(this.deleteProduct.bind(this)));
	}

	private async getAllProducts(req: Request, res: Response): Promise<void> {
		const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 12;
		const currentPage = parseInt(req.query.currentPage as string) || 1;
		const searchQuery = (req.query.searchQuery as string) || "";
		const categoryFilter = req.query.categoryFilter ? (req.query.categoryFilter as string).split(",") : [];
		const minPrice = parseFloat(req.query.minPrice as string) || 0;
		const maxPrice = parseFloat(req.query.maxPrice as string) || Number.MAX_SAFE_INTEGER;

		const products = await this.productDao.getAllProducts(itemsPerPage, currentPage, searchQuery, categoryFilter, minPrice, maxPrice);

		this.successResponse(res, products);
	}

	private async getProductById(req: Request, res: Response): Promise<void> {
		const productId = req.params.id;
		const product = await this.productDao.getProductById(parseInt(productId));

		if (!product) {
			return this.errorResponse(res, "Product not found", 404);
		}

		this.successResponse(res, product);
	}

	private async createProduct(req: Request, res: Response): Promise<void> {
		const { name, url_image, barcode, quantity, format, price, categoryIds } = req.body;

		const product = await this.productDao.createProduct(name, url_image, barcode, quantity, format, price, categoryIds);
		this.successResponse(res, product);
	}

	private async updateProduct(req: Request, res: Response): Promise<void> {
		const productId = req.params.id;
		const updateData = req.body;

		const product = await this.productDao.updateProduct(parseInt(productId), updateData);
		if (!product) {
			return this.errorResponse(res, "Product not found", 404);
		}
		this.successResponse(res, product);
	}

	private async deleteProduct(req: Request, res: Response): Promise<void> {
		const productId = req.params.id;
		const product = await this.productDao.deleteProduct(parseInt(productId));
		if (!product) {
			return this.errorResponse(res, "Product not found", 404);
		}

		this.successResponse(res, product);
	}
}

export default ProductController;
