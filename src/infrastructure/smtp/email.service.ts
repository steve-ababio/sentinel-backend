import nodemailer, { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import dns from "node:dns";
import { injectable } from 'tsyringe';


export interface IEmailService {
    sendEmail(email: string, subject: string, html: string,imageattachments:Mail.Attachment[]): Promise<void>;
}

@injectable()
export class EmailService implements IEmailService {
    private transporter: nodemailer.Transporter<SentMessageInfo>;

    constructor() {
        dns.setDefaultResultOrder("ipv4first");
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            requireTLS: true,
            auth: { 
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 60000,
            greetingTimeout: 60000,
            socketTimeout: 60000,
        } as nodemailer.TransportOptions);
    }

    async sendEmail(email: string, subject: string, html: string,imageattachments:Mail.Attachment[],): Promise<void> {
        const messageStatus = await this.transporter.sendMail({
            from: 'noreply <sentinel240391@gmail.com>',
            to: email, 
            subject,
            html,
            attachments:imageattachments
        });

        if (!messageStatus) {
            return Promise.reject(new Error('Failed to send email'));
        }

        return Promise.resolve();
    }
}