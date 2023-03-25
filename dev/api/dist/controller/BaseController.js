"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("./Controller"));
class BaseController extends Controller_1.default {
    initializeRoutes() {
        this.router.get("/", this.getBase.bind(this));
    }
    async getBase(req, res) {
        this.successResponse(res, "Welcome to the FoodFlow API! Please refer to the API documentation for usage instructions.");
    }
}
exports.default = BaseController;
