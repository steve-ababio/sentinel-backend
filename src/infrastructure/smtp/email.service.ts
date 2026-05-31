import nodemailer, { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { injectable } from 'tsyringe';


export interface IEmailService {
    sendEmail(email: string, subject: string, html: string,imageattachments:Mail.Attachment[]): Promise<void>;
}

@injectable()
export class EmailService implements IEmailService {
    private transporter: nodemailer.Transporter<SentMessageInfo>;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        } as nodemailer.TransportOptions);
    }

    async sendEmail(email: string, subject: string, html: string,imageattachments:Mail.Attachment[],): Promise<void> {
        const messageStatus = await this.transporter.sendMail({
            from: 'SPK <spk@gmail.com>',
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