import { Request, Response } from 'express';
import Controller from ".";
import UserDao from '../../DAO/UserDao';

class UserController extends Controller {
  private readonly userDao: UserDao;

  constructor() {
    super();
    this.userDao = new UserDao();
  }

  protected initializeRoutes(): void {
    
  }

  private async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    const user = await this.userDao.createUser(name, email, password);
    this.successResponse(res, user);
  }

  public async getUserByEmail(req: Request, res: Response): Promise<any> {
    const { email } = req.body;
    const user = await this.userDao.getUserByEmail(email);
    this.successResponse(res, user);
  }

  private async getUser(req: Request, res: Response): Promise<void> {
    const user = await this.userDao.getUserById(parseInt(req.params.id, 10));
    this.successResponse(res, user);
  }
}

export default UserController;
