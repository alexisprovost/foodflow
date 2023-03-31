import express from "express";
import bodyParser from "body-parser";
import Controller from "./1/Controller/RootController";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/1", new Controller().router);

app.use("*", (req, res) => {
	res.status(404).json({
		message: "The method you are trying to access does not exist. Please refer to the API documentation for usage instructions.",
	});
});

app.listen(3000, () => {
	console.log(`The API is running use /api/1 to access it.`);
});
