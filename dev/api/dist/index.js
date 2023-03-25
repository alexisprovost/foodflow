"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BaseController_1 = __importDefault(require("./controller/BaseController"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const app = (0, express_1.default)();
const port = 3000;
app.use("/users", new UserController_1.default().router);
app.use("/", new BaseController_1.default().router);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
