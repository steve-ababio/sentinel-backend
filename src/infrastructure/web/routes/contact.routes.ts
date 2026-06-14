import Router from "koa-router";
import { container } from "tsyringe";
import { EmailService } from "../../smtp/email.service";
import Joi from "joi";
import { validateRequest } from "../util/koa-joi-validate";
import { STATUS_CODES } from "@common/web/status-codes";

const emailService = container.resolve(EmailService);
const contactRouter = new Router();

contactRouter.post("/", 
    validateRequest({
        body: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            company: Joi.string().allow("").optional(),
            phoneCode: Joi.string().allow("").optional(),
            phoneNumber: Joi.string().allow("").optional(),
            message: Joi.string().required(),
        }
    }),
    async (ctx) => {
        try {
            const { name, email, company, phoneCode, phoneNumber, message } = ctx.request.body;
            
            const targetEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER || "sentinel240391@gmail.com";
            const subject = `New Contact Form Submission from ${name}`;
            
            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <h2 style="color: #333; border-bottom: 2px solid #333; padding-pb: 10px;">Contact Inquiry</h2>
                    <p style="font-size: 16px; color: #555;">You have received a new message from the website contact form.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                            <td style="padding: 8px 0; color: #555;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                            <td style="padding: 8px 0; color: #555;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        ${company ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Company:</td>
                            <td style="padding: 8px 0; color: #555;">${company}</td>
                        </tr>
                        ` : ""}
                        ${phoneNumber ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                            <td style="padding: 8px 0; color: #555;">${phoneCode || ""} ${phoneNumber}</td>
                        </tr>
                        ` : ""}
                    </table>
                    
                    <h3 style="color: #333; margin-top: 30px;">Message:</h3>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #333; border-radius: 4px; font-style: italic; white-space: pre-wrap; color: #444; line-height: 1.6;">${message}</div>
                </div>
            `;
            
            await emailService.sendEmail(targetEmail, subject, html, []);
            
            ctx.status = STATUS_CODES.OK;
            ctx.body = { success: true, message: "Email sent successfully" };
        } catch (error: any) {
            console.error("Failed to send contact email:", error);
            ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { success: false, message: error.message || "Failed to send email" };
        }
    }
);

export { contactRouter };
