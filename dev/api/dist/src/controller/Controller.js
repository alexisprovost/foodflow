"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Controller {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    successResponse(res, data) {
        res.status(200).json({ success: true, data });
    }
    errorResponse(res, msg, statusCode) {
        res.status(statusCode).json({ success: false, error: { msg } });
    }
}
exports.default = Controller;
