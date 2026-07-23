import Mail from 'nodemailer/lib/mailer';
export interface IEmailService {
    sendEmail(email: string, subject: string, html: string, imageattachments: Mail.Attachment[]): Promise<void>;
}
export declare class EmailService implements IEmailService {
    private transporter;
    constructor();
    sendEmail(email: string, subject: string, html: string, imageattachments: Mail.Attachment[]): Promise<void>;
}
