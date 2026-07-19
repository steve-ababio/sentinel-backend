"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailMailer = void 0;
const email_service_1 = require("../email.service");
const tsyringe_1 = require("tsyringe");
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const route_error_1 = require("@infrastructure/web/util/route-error");
const status_codes_1 = require("@common/web/status-codes");
const TEMPLATE_PATH = path_1.default.join(__dirname, "/templates");
let SendEmailMailer = class SendEmailMailer {
    constructor() {
        this.emailService = new email_service_1.EmailService();
    }
    getLogoUrl() {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        return `${frontendUrl}/assets/images/logo/logo-2.svg`;
    }
    async getHtmlContent(filename) {
        try {
            return await (0, promises_1.readFile)(path_1.default.join(TEMPLATE_PATH, filename), 'utf8');
        }
        catch (error) {
            console.error(`Failed to load template: ${filename}`, error);
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR, 'Html template loading failed');
        }
    }
    replaceTemplateVariables(content, variables) {
        let result = content;
        for (const [key, value] of Object.entries(variables)) {
            result = result.split(`{{${key}}}`).join(value);
        }
        return result;
    }
    async sendEmail(to, subject, content, attachments) {
        try {
            await this.emailService.sendEmail(to, subject, content, attachments);
        }
        catch (error) {
            console.error(`Failed to send email to ${to}`, error);
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR, 'Email sending failed');
        }
    }
    async sendOtpEmail(to, otp) {
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
    async sendPasswordResetEmail(to, subject, content, headline) {
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
    async sendReceiptEmail(to, tx) {
        const formatDate = (dateString) => {
            if (!dateString)
                return "";
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
        const formatAmount = (amount, currency) => {
            if (currency?.toUpperCase() === "USD" || currency === "$") {
                return `$${amount}`;
            }
            if (currency?.toUpperCase() === "GHS" || currency === "GH₵") {
                return `GH₵${amount}`;
            }
            return `${currency} ${amount}`;
        };
        const formatPaymentMethod = (tx) => {
            if (tx.cardBrand && tx.cardLast4) {
                const brand = tx.cardBrand.charAt(0).toUpperCase() + tx.cardBrand.slice(1);
                return `${brand} - ${tx.cardLast4}`;
            }
            if (tx.paymentMode) {
                return tx.paymentMode.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
};
exports.SendEmailMailer = SendEmailMailer;
exports.SendEmailMailer = SendEmailMailer = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], SendEmailMailer);
