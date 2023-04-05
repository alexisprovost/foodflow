import { Request, Response } from "express";
import Controller from ".";
import ProductDao from "../DAO/ProductDAO";

class ProductController extends Controller {
  private productDao: ProductDao;

  constructor() {
    super();
    this.productDao = new ProductDao();
  }

  protected initializeRoutes(): void {
    this.router.get("/", this.getAllProducts.bind(this));
    this.router.get("/:id", this.getProductById.bind(this));
    this.router.post("/", this.createProduct.bind(this));
    this.router.put("/:id", this.updateProduct.bind(this));
    this.router.delete("/:id", this.deleteProduct.bind(this));
  }

  private async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productDao.getAllProducts();
      this.successResponse(res, products);
    } catch (err) {
      console.error("Error getting products:", err);
      this.errorResponse(res, "Internal server error", 500);
    }
  }

  private async getProductById(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;

    try {
      const product = await this.productDao.getProductById(parseInt(productId));
      if (!product) {
        return this.errorResponse(res, "Product not found", 404);
      }

      this.successResponse(res, product);
    } catch (err) {
      console.error("Error getting product:", err);
      this.errorResponse(res, "Internal server error", 500);
    }
  }

  private async createProduct(req: Request, res: Response): Promise<void> {
    const { name, url_image, barcode, quantity, format, price, categoryIds} = req.body;

    try {
      const product = await this.productDao.createProduct(name, url_image, barcode, quantity, format, price, categoryIds);
      this.successResponse(res, product);
    } catch (err) {
      console.error("Error creating product:", err);
      this.errorResponse(res, "Internal server error", 500);
    }
  }

  private async updateProduct(req: Request, res: Response): Promise<void> {
    const productId = req.params.id;
    const {name, barcode, added_date, quantity, category, format, url_image } = req.body;

    try {
      const product = await this.productDao.updateProduct(parseInt(productId), name, barcode, added_date, quantity, category, format, url_image);
      if (!product) {
        return this.errorResponse(res, "Product not found", 404);
      }

        this.successResponse(res, product);
    } catch (err) {

        console.error("Error updating product:", err);
        this.errorResponse(res, "Internal server error", 500);
        }
    }

    private async deleteProduct(req: Request, res: Response): Promise<void> {
        const productId = req.params.id;

        try {
            const product = await this.productDao.deleteProduct(parseInt(productId));
            if (!product) {
                return this.errorResponse(res, "Product not found", 404);
            }

            this.successResponse(res, product);
        } catch (err) {
            console.error("Error deleting product:", err);
            this.errorResponse(res, "Internal server error", 500);
        }
    }
}

export default ProductController;