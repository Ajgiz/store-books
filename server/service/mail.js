const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_host,
      port: +process.env.SMTP_port,
      secure: false,
      auth: {
        user: process.env.SMTP_user,
        pass: process.env.SMTP_password,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_user,
      to,
      subject: "Активация аккаунта на сайте " + process.env.URL_client,
      text: "",
      html: `
        <div>
          <h1>Ссылка на активация</h1>
          <h2>
            <a href=${link}>${link}</a>
          </h2>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
