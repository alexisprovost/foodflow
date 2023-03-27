import { Router, Response } from 'express';

import Dao from '../DAO';

abstract class Controller {
    public router: Router;
    protected dao: Dao;

    constructor (dao: Dao) {
        this.router = Router();
        this.dao = dao;
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