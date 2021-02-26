import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

class SendMailService {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                this.client = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });
            });
    }

    async execute(to: string, subject: string, variables: object, path: string) {
        let templateFileContent = fs.readFileSync(path).toString("utf8");

        let mailTemplateParse = handlebars.compile(templateFileContent);

        let html = mailTemplateParse(variables);

        let message = await this.client.sendMail({
            from: "NPS <noreplay@nps.com.br>",
            to,
            subject,
            html: html
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();
