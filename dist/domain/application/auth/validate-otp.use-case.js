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
exports.ValidateOtpUseCase = void 0;
const enum_1 = require("@common/auth/enum");
const logger_1 = require("@infrastructure/web/util/logger");
const route_error_1 = require("@infrastructure/web/util/route-error");
const tsyringe_1 = require("tsyringe");
const jwt_1 = require("@infrastructure/web/util/jwt");
const status_codes_1 = require("@common/web/status-codes");
const constants_1 = require("@common/user/constants");
const enum_2 = require("@common/user/enum");
const logger = (0, logger_1.createLogger)('USE_CASE', 'SENT_OTP');
let ValidateOtpUseCase = class ValidateOtpUseCase {
    constructor(otpPersistencePort, contactPersistencePort, userPersistencePort) {
        this.otpPersistencePort = otpPersistencePort;
        this.contactPersistencePort = contactPersistencePort;
        this.userPersistencePort = userPersistencePort;
    }
    async validateOtp(identifier, code, identifierType, otpValidationtype) {
        const otp = await this.otpPersistencePort.findActiveOtpByIdentifier(identifier, identifierType);
        if (!otp) {
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, constants_1.OTP_ERROR_MESSAGES.INVALID_OTP);
        }
        if (otp.expiresAt < new Date()) {
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, constants_1.OTP_ERROR_MESSAGES.OTP_EXPIRED);
        }
        if (otp.attempts >= parseInt(process.env.OTP_VALIDATION_ATTEMPT, 10)) {
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, constants_1.OTP_ERROR_MESSAGES.MAXIMUM_ATTEMPTS_EXCEEDED);
        }
        if (otp.code !== btoa(code)) {
            otp.attempts += 1;
            await this.otpPersistencePort.update(otp.id, { attempts: otp.attempts });
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.BAD_REQUEST, constants_1.OTP_ERROR_MESSAGES.OTP_USED);
        }
        await this.otpPersistencePort.update(otp.id, { status: enum_1.OtpStatus.USED });
        const user = await this.userPersistencePort.findById(otp.userId);
        if (otpValidationtype === enum_2.OtpValidationType.CONTACT_VALIDATION) {
            await this.contactPersistencePort.save({ userId: user?.id, identifier, identifierType, status: enum_2.ContactStatus.VERIFIED });
            return { success: true };
        }
        else if (otpValidationtype === enum_2.OtpValidationType.PASSWORD_RESET) {
            await this.userPersistencePort.updateAccountAuthStatus(user.id, enum_1.AccountAuthStatus.PASSWORD_RESET);
            const token = (0, jwt_1.generateResetToken)(user.id);
            return { success: true, details: { token } };
        }
        return { success: false };
    }
};
exports.ValidateOtpUseCase = ValidateOtpUseCase;
exports.ValidateOtpUseCase = ValidateOtpUseCase = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)('OtpPersistencePort')),
    __param(1, (0, tsyringe_1.inject)('ContactPersistencePort')),
    __param(2, (0, tsyringe_1.inject)('UserPersistencePort')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ValidateOtpUseCase);
