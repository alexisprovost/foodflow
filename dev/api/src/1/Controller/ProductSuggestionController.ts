import { Request, Response } from "express";
import Controller from ".";
import ProductSuggestionDAO from "../DAO/ProductSuggestionDAO";
import { requireAuth } from "./authMiddleware";


/**
 * ============================================
 * Filename: ProductSuggestionController.ts
 * Author(s): Thomas Pelletier, Alexis Provost
 * Description: This file contains the logic for the product suggestion controller. It is used to handle all requests related to product suggestions.
 * Sources: 
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */
class ProductSuggestionController extends Controller {
    private productSuggestionDAO: ProductSuggestionDAO;

    constructor() {
        super();
        this.productSuggestionDAO = new ProductSuggestionDAO();
        this.useJsonBodyParser();
    }

    protected initializeRoutes(): void {
        this.router.get("/", requireAuth, this.handleAsync(this.getSuggestions.bind(this)));
    }

    private async getSuggestions(req: Request, res: Response): Promise<void> {
        const user: any = req.user;
        const suggestions = await this.productSuggestionDAO.getSuggestions(user.id);
        this.successResponse(res, suggestions);
    }
}

export default ProductSuggestionController;
