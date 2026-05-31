import { EmailService } from "../email.service";
import { injectable } from "tsyringe";
import path from "path";
import { readFile } from "fs/promises";
import Mail from "nodemailer/lib/mailer";
import { RouteError } from "@infrastructure/web/util/route-error";
import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";
import { STATUS_CODES } from "@common/web/status-codes";
import { TransactionEntity } from "@domain/models/entities/transaction.entity";

const TEMPLATE_PATH = path.join(__dirname, "/templates");

@injectable()
export class SendEmailMailer implements SendEmailNotificationPort {
    private emailService: EmailService;
    constructor() {
        this.emailService = new EmailService();
    }

    private getLogoUrl(): string {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        return `${frontendUrl}/assets/images/logo/logo-2.svg`;
    }

    private async getHtmlContent(filename: string): Promise<string> {
        try {
            return await readFile(path.join(TEMPLATE_PATH, filename), 'utf8');
        } catch (error) {
            console.error(`Failed to load template: ${filename}`, error);
            throw new RouteError(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Html template loading failed');
        }
    }

    private replaceTemplateVariables(content: string, variables: Record<string, string>): string {
        let result = content;
        for (const [key, value] of Object.entries(variables)) {
            result = result.split(`{{${key}}}`).join(value);
        }
        return result;
    }

    private async sendEmail(to: string, subject: string, content: string, attachments: Mail.Attachment[]) {
        try {
            await this.emailService.sendEmail(to, subject, content, attachments);
        } catch (error) {
            console.error(`Failed to send email to ${to}`, error);
            throw new RouteError(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Email sending failed');
        }
    }

    async sendOtpEmail(to: string, otp: string): Promise<void> {
        let htmlContent = await this.getHtmlContent("auth/auth_email_template.html");
        const placeHolderVariables = {
            userName: to,
            currentYear: new Date().getFullYear().toString(),
            otp,
            Action: "Authentication",
            logoUrl: this.getLogoUrl(),
        };
        htmlContent = this.replaceTemplateVariables(htmlContent, placeHolderVariables);
        await this.sendEmail(to, 'Your OTP Code', htmlContent, []);
    }

    async sendPasswordResetEmail(to: string, subject: string, content: string, headline: string): Promise<void> {
        let htmlContent = await this.getHtmlContent("auth/password_reset_email_template.html");
        const placeHolderVariables = {
            userName: to,
            currentYear: new Date().getFullYear().toString(),
            headline,
            content,
            logoUrl: this.getLogoUrl(),
        };
        htmlContent = this.replaceTemplateVariables(htmlContent, placeHolderVariables);
        await this.sendEmail(to, subject, htmlContent, []);
    }

    async sendReceiptEmail(to: string, tx: TransactionEntity): Promise<void> {
        const formatDate = (dateString?: Date | string) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            const day = date.getDate();
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            let hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minStr = minutes < 10 ? "0" + minutes : minutes;

            return `${day} ${month} ${year} ${hours}:${minStr}${ampm}`;
        };

        const formatAmount = (amount: number, currency: string) => {
            if (currency?.toUpperCase() === "USD" || currency === "$") {
                return `$${amount}`;
            }
            if (currency?.toUpperCase() === "GHS" || currency === "GH₵") {
                return `GH₵${amount}`;
            }
            return `${currency} ${amount}`;
        };

        const formatPaymentMethod = (tx: any) => {
            if (tx.cardBrand && tx.cardLast4) {
                const brand = tx.cardBrand.charAt(0).toUpperCase() + tx.cardBrand.slice(1);
                return `${brand} - ${tx.cardLast4}`;
            }
            if (tx.paymentMode) {
                return tx.paymentMode.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
            }
            return tx.provider || "Card";
        };

        const formattedDate = formatDate(tx.createdAt);
        const amountStr = formatAmount(tx.amount, tx.currency);
        const methodStr = formatPaymentMethod(tx);
        const courseName = tx.courseTitle || "Sentinel Prime K Course Enrollment";
        const refStr = tx.providerRef || tx.id || "N/A";

        let htmlContent = await this.getHtmlContent("payment/receipt_email_template.html");
        const placeHolderVariables = {
            userName: to,
            currentYear: new Date().getFullYear().toString(),
            receiptNumber: refStr,
            amount: amountStr,
            date: formattedDate,
            paymentMethod: methodStr,
            courseTitle: courseName,
            logoUrl: this.getLogoUrl(),
        };

        htmlContent = this.replaceTemplateVariables(htmlContent, placeHolderVariables);
        await this.sendEmail(to, 'Your Payment Receipt - Sentinel Prime K', htmlContent, []);
    }
}
