"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpEntity = void 0;
const enum_1 = require("@common/auth/enum");
class OtpEntity {
    constructor(userId, identifier, identifierType, status, expiresAt, code, attempts, id) {
        this.userId = userId;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.status = status;
        this.expiresAt = expiresAt;
        this.code = code;
        this.attempts = attempts;
        this.id = id;
    }
    static newInstance(otpCode, identifierType, userId, identifier) {
        return new OtpEntity(userId, identifier, identifierType, enum_1.OtpStatus.ACTIVE, this.getExpiry(parseInt(process.env.OTP_EXPIRY_MINUTES, 10)), otpCode, 0);
    }
    static getExpiry(duration) {
        return new Date(new Date().getTime() + duration * 60000);
    }
}
exports.OtpEntity = OtpEntity;
