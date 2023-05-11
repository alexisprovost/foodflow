import Mailgun from "mailgun.js";
import formData from "form-data";

class EmailService {
	private client: any;

	constructor() {
		const mailgun = new Mailgun(formData);
		this.client = mailgun.client({
			username: "api",
			key: process.env.MAILGUN_API_KEY || "",
		});
	}

	public async send(to: string, subject: string, message: string): Promise<void> {
		const data = {
			from: "foodflow@foodflow.sshort.net",
			to: to,
			subject: subject,
			text: message,
		};

		this.client.messages
			.create("sandbox100154ae304043ff97f7a20862b44fe1.mailgun.org", {
				from: "FoodFlow <mailgun@sandbox100154ae304043ff97f7a20862b44fe1.mailgun.org>",
				to: [to],
				subject: "FoodFlow - Order Confirmation",
				text: "Hi, thanks for ordering with FoodFlow!",
				html: "<h1>Hi, thanks for ordering with FoodFlow! </h1>",
			})
			.then((msg: any) => console.log(msg)) // logs response data
			.catch((err: any) => console.log(err));
	}
}

export default EmailService;
