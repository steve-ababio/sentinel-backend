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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordResetUseCase = void 0;
const constants_1 = require("@common/auth/constants");
const jwt_1 = require("@infrastructure/web/util/jwt");
const route_error_1 = require("@infrastructure/web/util/route-error");
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = __importDefault(require("bcrypt"));
const enum_1 = require("@common/auth/enum");
const status_codes_1 = require("@common/web/status-codes");
let ResetPasswordResetUseCase = class ResetPasswordResetUseCase {
    constructor(userPersistencePort, sendEmailNotificationPort) {
        this.userPersistencePort = userPersistencePort;
        this.sendEmailNotificationPort = sendEmailNotificationPort;
    }
    async resetPassword(resetToken, newPassword) {
        const userId = (0, jwt_1.verifyResetToken)(resetToken);
        if (!userId) {
            throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.UNAUTHORIZED, constants_1.MESSAGES.RESET_TOKEN_EXPIRED);
        }
        const hashedPassword = await this.hash(newPassword);
        const userPaasswordUpdate = await this.userPersistencePort.updatePassword(userId, hashedPassword);
        const user = await this.userPersistencePort.findById(userId);
        await this.userPersistencePort.updateAccountAuthStatus(user.id, enum_1.AccountAuthStatus.OK);
        await this.sendEmailNotificationPort.sendPasswordResetEmail(user?.email, 'Password reset success', 'Your password has been updated successfully', 'Password reset success');
        return userPaasswordUpdate;
    }
    async hash(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
};
exports.ResetPasswordResetUseCase = ResetPasswordResetUseCase;
exports.ResetPasswordResetUseCase = ResetPasswordResetUseCase = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)('UserPersistencePort')),
    __param(1, (0, tsyringe_1.inject)('SendEmailNotificationPort')),
    __metadata("design:paramtypes", [Object, Object])
], ResetPasswordResetUseCase);
