/**
 * ============================================
 * Filename: EmailServices.ts
 * Author(s): Alexis Provost, Thomas Pelletier
 * Description: This file contains the logic for the email service. It is used to send emails to users that contains confirmation for transaction.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 * */
import Mailgun from "mailgun.js";
import formData from "form-data";

class EmailService {
	private client: any;
	private mailgun_api_key: string;
	private mailgun_domain: string;

	constructor() {
		this.mailgun_api_key = process.env.MAILGUN_API_KEY || "";
		this.mailgun_domain = process.env.MAILGUN_DOMAIN || "";

		if (this.mailgun_api_key && this.mailgun_domain) {
			const mailgun = new Mailgun(formData);

			this.client = mailgun.client({
				username: "api",
				key: this.mailgun_api_key,
			});
		} else {
			console.log("Mailgun not configured");
		}
	}

	public async send(to: string, subject: string, message: string): Promise<void> {
		if (this.mailgun_api_key && this.mailgun_domain) {
			this.client.messages
				.create(this.mailgun_domain, {
					from: "FoodFlow <mailgun@" + this.mailgun_domain + ">",
					to: [to],
					subject: "FoodFlow - Order Confirmation",
					text: "Hi, thanks for ordering with FoodFlow!",
					html: message,
				})
				.then((msg: any) => console.log(msg))
				.catch((err: any) => console.log(err));
		} else {
			console.log("Mailgun not configured no email sent");
		}
	}
}

export default EmailService;
