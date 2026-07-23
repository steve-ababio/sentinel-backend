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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const node_dns_1 = __importDefault(require("node:dns"));
const tsyringe_1 = require("tsyringe");
let EmailService = class EmailService {
    constructor() {
        node_dns_1.default.setDefaultResultOrder("ipv4first");
        this.transporterPromise = this.initTransporter();
    }
    async initTransporter() {
        const host = process.env.EMAIL_HOST || '';
        let resolvedHost = host;
        try {
            if (host) {
                const lookupResult = await node_dns_1.default.promises.lookup(host, { family: 4 });
                resolvedHost = lookupResult.address;
            }
        }
        catch (error) {
            console.error(`DNS lookup failed for SMTP host ${host}, falling back to hostname:`, error);
        }
        return nodemailer_1.default.createTransport({
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
        });
    }
    async sendEmail(email, subject, html, imageattachments) {
        const transporter = await this.transporterPromise;
        const messageStatus = await transporter.sendMail({
            from: 'noreply <sentinel240391@gmail.com>',
            to: email,
            subject,
            html,
            attachments: imageattachments
        });
        if (!messageStatus) {
            return Promise.reject(new Error('Failed to send email'));
        }
        return Promise.resolve();
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
