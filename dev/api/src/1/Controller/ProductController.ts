import { Request, Response } from "express";
import Controller from ".";
import ProductDao from "../DAO/ProductDAO";

class ProductController extends Controller {
	private productDao: ProductDao;

	constructor() {
		super();
		this.productDao = new ProductDao();
		this.useJsonBodyParser(); // use body-parser to parse JSON data
	}

	protected initializeRoutes(): void {
		this.router.get("/", this.handleAsync(this.getAllProducts.bind(this)));
		this.router.get("/:id", this.handleAsync(this.getProductById.bind(this)));
		this.router.post("/", this.handleAsync(this.createProduct.bind(this)));
		this.router.put("/:id", this.handleAsync(this.updateProduct.bind(this)));
		this.router.delete("/:id", this.handleAsync(this.deleteProduct.bind(this)));
	}

	private async getAllProducts(req: Request, res: Response): Promise<void> {
		const products = await this.productDao.getAllProducts();
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
		const { name, barcode, added_date, quantity, category, format, url_image } = req.body;

		const product = await this.productDao.updateProduct(parseInt(productId), name, barcode, added_date, quantity, category, format, url_image);
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
