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
exports.GoogleAuthUseCase = void 0;
const constants_1 = require("@common/auth/constants");
const enum_1 = require("@common/auth/enum");
const google_auth_strategy_1 = require("@infrastructure/google-auth/google-auth.strategy");
const jwt_1 = require("@infrastructure/web/util/jwt");
const logger_1 = require("@infrastructure/web/util/logger");
const tsyringe_1 = require("tsyringe");
const user_info_entity_1 = require("@domain/models/entities/user-info.entity");
let GoogleAuthUseCase = class GoogleAuthUseCase {
    constructor(googleAuthStrategy, loginPort, registerPort, createAccountSessionActivityPort, userInfoPersistencePort) {
        this.googleAuthStrategy = googleAuthStrategy;
        this.loginPort = loginPort;
        this.registerPort = registerPort;
        this.createAccountSessionActivityPort = createAccountSessionActivityPort;
        this.userInfoPersistencePort = userInfoPersistencePort;
    }
    async authenticate(idToken, userAgent) {
        try {
            const { email, id: socialChannelId, displayName } = await this.googleAuthStrategy.verifyToken(idToken);
            let loginResponse;
            try {
                loginResponse = await this.loginPort.login({ email: email, socialChannelId, socialChannel: enum_1.SocialChannel.GOOGLE });
            }
            catch (error) {
                if (error.message === constants_1.MESSAGES.INVALID_EMAIL_PASSWORD) {
                    const user = await this.registerPort.register({
                        email: email,
                        socialChannelId,
                        socialChannel: enum_1.SocialChannel.GOOGLE,
                    });
                    let firstName = "";
                    let lastName = "";
                    if (displayName) {
                        const parts = displayName.trim().split(" ");
                        firstName = parts[0] || "";
                        lastName = parts.slice(1).join(" ") || "";
                    }
                    try {
                        await this.userInfoPersistencePort.create(new user_info_entity_1.UserInfoEntity(user.id, firstName, lastName, ""));
                    }
                    catch (infoError) {
                        logger_1.logger.error("Failed to create UserInfo for Google signup:", infoError);
                    }
                    loginResponse = { user };
                }
                else {
                    logger_1.logger.error(error);
                    throw error;
                }
            }
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: loginResponse.user.id,
                status: enum_1.AccountSessionStatus.ACTIVE,
                deviceType: userAgent.platform,
                os: userAgent.os,
            });
            const tokens = (0, jwt_1.generateTokenPair)(loginResponse.user.id, sessionId);
            return { message: constants_1.MESSAGES.LOGIN_SUCCESS, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error('Invalid Google ID token or other error occurred');
        }
    }
};
exports.GoogleAuthUseCase = GoogleAuthUseCase;
exports.GoogleAuthUseCase = GoogleAuthUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("GoogleAuthStrategy")),
    __param(1, (0, tsyringe_1.inject)("LoginPort")),
    __param(2, (0, tsyringe_1.inject)("RegisterPort")),
    __param(3, (0, tsyringe_1.inject)("CreateAccountSessionActivityPort")),
    __param(4, (0, tsyringe_1.inject)("UserInfoPersistencePort")),
    __metadata("design:paramtypes", [google_auth_strategy_1.GoogleAuthStrategy, Object, Object, Object, Object])
], GoogleAuthUseCase);
