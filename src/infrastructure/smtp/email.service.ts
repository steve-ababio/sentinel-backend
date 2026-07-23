import nodemailer, { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import dns from "node:dns";
import { injectable } from 'tsyringe';
import { logger } from '@infrastructure/web/util/logger';


export interface IEmailService {
    sendEmail(email: string, subject: string, html: string,imageattachments:Mail.Attachment[]): Promise<void>;
}

@injectable()
export class EmailService implements IEmailService {
    private transporterPromise: Promise<nodemailer.Transporter<SentMessageInfo>>;

    constructor() {
        dns.setDefaultResultOrder("ipv4first");
        this.transporterPromise = this.initTransporter();

    }

    private async initTransporter(): Promise<nodemailer.Transporter<SentMessageInfo>> {

        const transporterPromise =  nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        } as nodemailer.TransportOptions);
        logger.info("host:",process.env.MAIL_HOST);
        logger.info("port:",process.env.MAIL_PORT);
        logger.info("user:",process.env.MAIL_USER);
        logger.info("pass:",process.env.MAIL_PASS);
        const transporter = await this.transporterPromise;
        await transporter.verify();
        logger.info("SMTP connected");
        return transporterPromise;
        
    }

    async sendEmail(email: string, subject: string, html: string,imageattachments:Mail.Attachment[],): Promise<void> {
        const transporter = await this.transporterPromise;
        const messageStatus = await transporter.sendMail({
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