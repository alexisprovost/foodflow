import express from "express";
import bodyParser from "body-parser";
import Controller from "./Controller/1/RootController";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("1", new Controller().router);

app.listen(3000, () => {
	console.log(`The API is running use /api to access it.`);
});
