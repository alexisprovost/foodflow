import Mailgun from "mailgun.js";
import formData from "form-data";

class EmailService {
	private client: any;

	constructor() {
		const mailgun = new Mailgun(formData);
		this.client = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY || "key-yourkeyhere" });
	}

	public async send(to: string, subject: string, message: string): Promise<void> {
		const data = {
			from: "foodflow@foodflow.sshort.net",
			to: to,
			subject: subject,
			text: message,
		};

		try {
			await this.client.messages.create("YOUR_DOMAIN", data);
			console.log(`Email sent to ${to}: ${subject}`);
		} catch (err: any) {
			console.error(`Error sending email to ${to}: ${err.message}`);
		}
	}
}

export default EmailService;
