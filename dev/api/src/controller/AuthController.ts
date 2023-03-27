import {Request, Response} from 'express';
import Controller from './Controller';

class AuthController extends Controller {
    protected initializeRoutes(): void {
        this.router.get('/', this.getAuth.bind(this));
    }

	private async getAuth(req: Request, res: Response): Promise<void> {

		console.log(this.dao.userDao.getAllUsers());

		this.successResponse(res, 'Welcome to the FoodFlow API! Please refer to the API documentation for usage instructions.');
	}
    
}

export default AuthController;
