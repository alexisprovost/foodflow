import express from "express";
import BaseController from "./controller/BaseController";
import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";

import Dao from "./DAO";

const app = express();
const port = 3000;

const dao = new Dao();

// create the controllers
app.use("/auth", new AuthController(dao).router);
app.use("/users", new UserController(dao).router);
app.use("/", new BaseController(dao).router);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
