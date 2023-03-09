import {Request, Response} from 'express';
import Controller from './Controller';

class UserController extends Controller {
    protected initializeRoutes(): void {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/:id', this.getUser.bind(this));
    }

    private async getUsers(req: Request, res: Response): Promise<void> {
        this.successResponse(res, 'Hello World!');
    }

    private async getUser(req: Request, res: Response): Promise<void> {
        this.successResponse(res, req.params.id);
    }
}

export default UserController;
