import { Router, Response, Request } from "express";
import Controller from ".";

import UserController from "./UserController";
import AuthController from "./AuthController";

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

    this.router.use("/users", userController.router);
    this.router.use("/auth", authController.router);

    this.router.get("/", this.defaultMessage.bind(this));
  }

  private async defaultMessage(req: Request, res: Response): Promise<void> {
    this.successResponse(
      res,
      "Welcome to the FoodFlow API! Please refer to the API documentation for usage instructions."
    );
  }
}

export default ControllerV1;
