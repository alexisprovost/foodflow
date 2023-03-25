import express from "express";
import BaseController from "./controller/BaseController";
import UserController from "./controller/UserController";

const app = express();
const port = 3000;

app.use("/users", new UserController().router);
app.use("/", new BaseController().router);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
