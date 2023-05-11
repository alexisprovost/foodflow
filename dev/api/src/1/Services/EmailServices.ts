import Mailgun from "mailgun.js";
import formData from "form-data";

class EmailService {
	private client: any;
	private mailgun_api_key: string;
	private mailgun_domain: string;

	constructor() {
		const mailgun = new Mailgun(formData);
		this.mailgun_api_key = process.env.MAILGUN_API_KEY || "";
		this.mailgun_domain = process.env.MAILGUN_DOMAIN || "";
		this.client = mailgun.client({
			username: "api",
			key: this.mailgun_api_key,
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
			.create(this.mailgun_domain, {
				from: "FoodFlow <" + this.mailgun_domain + ">",
				to: [to],
				subject: "FoodFlow - Order Confirmation",
				text: "Hi, thanks for ordering with FoodFlow!",
				html: "<h1>Hi, thanks for ordering with FoodFlow! </h1>",
			})
			.then((msg: any) => console.log(msg))
			.catch((err: any) => console.log(err));
	}
}

export default EmailService;
