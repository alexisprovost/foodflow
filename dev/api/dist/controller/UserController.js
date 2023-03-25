"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("./Controller"));
class UserController extends Controller_1.default {
    initializeRoutes() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/:id', this.getUser.bind(this));
    }
    async getUsers(req, res) {
        this.successResponse(res, 'Hello World!');
    }
    async getUser(req, res) {
        this.successResponse(res, req.params.id);
    }
}
exports.default = UserController;
