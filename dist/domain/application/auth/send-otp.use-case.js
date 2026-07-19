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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOtpUseCase = void 0;
const enum_1 = require("@common/auth/enum");
const otp_entity_1 = require("@domain/models/entities/otp.entity");
const logger_1 = require("@infrastructure/web/util/logger");
const otp_1 = require("@infrastructure/web/util/otp");
const tsyringe_1 = require("tsyringe");
const logger = (0, logger_1.createLogger)('USE_CASE', 'SENT_OTP');
const SENDER_ID = process.env.ARKESEL_SMS_SENDER_ID;
let SendOtpUseCase = class SendOtpUseCase {
    constructor(otpPersistencePort, userPersistencePort, sendEmailNotificationPort) {
        this.otpPersistencePort = otpPersistencePort;
        this.userPersistencePort = userPersistencePort;
        this.sendEmailNotificationPort = sendEmailNotificationPort;
    }
    async sendOtp(identifier, identifierType, userId) {
        if (!userId && identifierType === enum_1.IdentifierType.EMAIL) {
            const user = await this.userPersistencePort.findByEmail(identifier);
            userId = user?.id;
        }
        await this.otpPersistencePort.invalidateActiveOtps(userId, identifierType);
        const code = (0, otp_1.generateOtpCode)();
        const otp = otp_entity_1.OtpEntity.newInstance(btoa(code), identifierType, userId, identifier);
        await this.otpPersistencePort.save(otp);
        await this.sendOtpToUser(identifier, code, identifierType);
        return { success: true };
    }
    async sendOtpToUser(identifier, code, identifierType) {
        if (identifierType === enum_1.IdentifierType.EMAIL) {
            await this.sendEmailNotificationPort.sendOtpEmail(identifier, code);
        }
        logger.info(`Sending OTP ${code} to ${identifier}`);
    }
};
exports.SendOtpUseCase = SendOtpUseCase;
exports.SendOtpUseCase = SendOtpUseCase = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)('OtpPersistencePort')),
    __param(1, (0, tsyringe_1.inject)('UserPersistencePort')),
    __param(2, (0, tsyringe_1.inject)('SendEmailNotificationPort')),
    __metadata("design:paramtypes", [Object, Object, Object])
], SendOtpUseCase);
