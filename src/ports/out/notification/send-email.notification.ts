export interface SendEmailNotificationPort {
    sendOtpEmail(to: string,otp: string): Promise<void>;
    sendPasswordResetEmail(to:string,subject:string,content:string,headline:string):Promise<void>
}