import { Router, Response, Request } from "express";
import Controller from ".";

import UserController from "./UserController";
import AuthController from "./AuthController";
import ProductController from "./ProductController";
import SetupController from "./SetupController";

class ControllerV1 extends Controller {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    const userController = new UserController();
    const authController = new AuthController();
    const productController = new ProductController();
    const setupController = new SetupController();

    this.router.use("/users", userController.router);
    this.router.use("/auth", authController.router);
    this.router.use("/products", productController.router);
    this.router.use("/setup", setupController.router);

    this.router.get("/", this.defaultMessage.bind(this));
  }

  private async defaultMessage(req: Request, res: Response): Promise<void> {
    this.successResponse(
      res,
      "Welcome to the FoodFlow API Version 1! Please refer to the API documentation for usage instructions."
    );
  }
}

export default ControllerV1;
