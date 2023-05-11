import nodemailer from "nodemailer";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "thomaspelletier@hotmail.ca",
        pass: "20Decembre",
      },
    });
  }

  public async send(to: string, subject: string, message: string): Promise<void> {
    const mailOptions = {
      from: "thomaspelletier@hotmail.ca",
      to,
      subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}: ${subject}`);
    } catch (err) {
      console.error(`Error sending email to ${to}: ${err}`);
    }
  }
}

export default EmailService;
