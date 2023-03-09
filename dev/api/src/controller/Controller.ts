import { Router, Response } from 'express';

abstract class Controller {
    public router: Router;

    constructor () {
        this.router = Router();
        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;

    protected successResponse(res: Response, data: any) {
        res.status(200).json({ success: true, data });
    }

    protected errorResponse(res: Response, msg: string, statusCode: number) {
        res.status(statusCode).json({ success: false, error: { msg } });
    }
}

export default Controller;