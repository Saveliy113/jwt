const nodemailer = require('nodemailer');

class MailService {
    constructor () {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.CLIENT_URL}`,
            text: '',
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h1 style="color: #333333; text-align: center;">Добро пожаловать!</h1>
                        <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                            Чтобы активировать ваш аккаунт, нажмите на кнопку ниже:
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${link}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 14px 28px; border-radius: 5px; font-size: 16px; display: inline-block;">
                                Активировать аккаунт
                            </a>
                        </div>
                        <p style="color: #888888; font-size: 14px;">
                            Или скопируйте и вставьте эту ссылку в адресную строку браузера:<br>
                            <a href="${link}" style="color: #4CAF50;">${link}</a>
                        </p>
                        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eeeeee;">
                        <p style="color: #aaaaaa; font-size: 12px; text-align: center;">
                            © ${new Date().getFullYear()} ${process.env.API_URL}. Все права защищены.
                        </p>
                    </div>
                </div>
            `
        })
    }
}

module.exports = new MailService();