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
        const host = process.env.EMAIL_HOST || '';
        let resolvedHost = host;
        try {
            if (host) {
                // Force DNS lookup to prefer IPv4 over IPv6 to avoid ENETUNREACH in environments without outbound IPv6 (like Render)
                const lookupResult = await dns.promises.lookup(host, { family: 4 });
                resolvedHost = lookupResult.address;
            }
        } catch (error) {
            console.error(`DNS lookup failed for SMTP host ${host}, falling back to hostname:`, error);
        }

        const transporterPromise =  nodemailer.createTransport({
            host: resolvedHost,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                servername: host,
            }
        } as nodemailer.TransportOptions);
        logger.info("host:",process.env.EMAIL_HOST);
        logger.info("port:",process.env.EMAIL_PORT);
        logger.info("user:",process.env.EMAIL_USER);
        logger.info("pass:",process.env.EMAIL_PASS);
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