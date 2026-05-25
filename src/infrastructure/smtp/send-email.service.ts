import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";
import { injectable } from "tsyringe";
import { EmailService } from "./email.service";

@injectable()
export class SendEmailMailer implements SendEmailNotificationPort {
    private emailService: EmailService;
    constructor() {
        this.emailService = new EmailService();
    }
    async sendOtpEmail(to: string, otp: string): Promise<void> {
        
    }
    async sendPasswordResetEmail(to:string,subject:string,content:string,headline:string):Promise<void>{
        
    }
}