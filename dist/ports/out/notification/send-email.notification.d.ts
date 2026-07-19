import { TransactionEntity } from "@domain/models/entities/transaction.entity";
export interface SendEmailNotificationPort {
    sendOtpEmail(to: string, otp: string): Promise<void>;
    sendPasswordResetEmail(to: string, subject: string, content: string, headline: string): Promise<void>;
    sendReceiptEmail(to: string, tx: TransactionEntity): Promise<void>;
}
