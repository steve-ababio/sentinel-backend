"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const email_service_1 = require("../../smtp/email.service");
const joi_1 = __importDefault(require("joi"));
const koa_joi_validate_1 = require("../util/koa-joi-validate");
const status_codes_1 = require("@common/web/status-codes");
const emailService = tsyringe_1.container.resolve(email_service_1.EmailService);
const contactRouter = new koa_router_1.default();
exports.contactRouter = contactRouter;
contactRouter.post("/", (0, koa_joi_validate_1.validateRequest)({
    body: {
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        company: joi_1.default.string().allow("").optional(),
        phoneCode: joi_1.default.string().allow("").optional(),
        phoneNumber: joi_1.default.string().allow("").optional(),
        message: joi_1.default.string().required(),
    }
}), async (ctx) => {
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
        ctx.status = status_codes_1.STATUS_CODES.OK;
        ctx.body = { success: true, message: "Email sent successfully" };
    }
    catch (error) {
        console.error("Failed to send contact email:", error);
        ctx.status = status_codes_1.STATUS_CODES.INTERNAL_SERVER_ERROR;
        ctx.body = { success: false, message: error.message || "Failed to send email" };
    }
});
