import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";
import { TransactionEntity } from "@domain/models/entities/transaction.entity";
export declare class SendEmailMailer implements SendEmailNotificationPort {
    private emailService;
    constructor();
    private getLogoUrl;
    private getHtmlContent;
    private replaceTemplateVariables;
    private sendEmail;
    sendOtpEmail(to: string, otp: string): Promise<void>;
    sendPasswordResetEmail(to: string, subject: string, content: string, headline: string): Promise<void>;
    sendReceiptEmail(to: string, tx: TransactionEntity): Promise<void>;
}
