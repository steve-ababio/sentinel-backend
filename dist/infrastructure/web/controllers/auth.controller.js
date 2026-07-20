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
exports.AuthController = void 0;
const logger_1 = require("../util/logger");
const tsyringe_1 = require("tsyringe");
const jwt_1 = require("../util/jwt");
const enum_1 = require("@common/auth/enum");
const constants_1 = require("@common/auth/constants");
const status_codes_1 = require("@common/web/status-codes");
const utils_1 = require("@common/global/utils");
const route_error_1 = require("../util/route-error");
const logger = (0, logger_1.createLogger)('CONTROLLER', 'AUTH');
let AuthController = class AuthController {
    constructor(registerPort, loginPort, googleAuthPort, createAccountSessionActivityPort, requestPasswordResetPort, resetPasswordPort, logoutPort, sendOtpPort, validateOtpPort, accountSessionActivityPersistencePort) {
        this.registerPort = registerPort;
        this.loginPort = loginPort;
        this.googleAuthPort = googleAuthPort;
        this.createAccountSessionActivityPort = createAccountSessionActivityPort;
        this.requestPasswordResetPort = requestPasswordResetPort;
        this.resetPasswordPort = resetPasswordPort;
        this.logoutPort = logoutPort;
        this.sendOtpPort = sendOtpPort;
        this.validateOtpPort = validateOtpPort;
        this.accountSessionActivityPersistencePort = accountSessionActivityPersistencePort;
    }
    async register(ctx) {
        const dto = ctx.request.body;
        const { email, password } = dto;
        try {
            const user = await this.registerPort.register({ email, socialChannelId: null, socialChannel: enum_1.SocialChannel.NONE, password });
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: user.id,
                status: enum_1.AccountSessionStatus.ACTIVE,
                deviceType: ctx.userAgent.platform,
                os: ctx.userAgent.os
            });
            const tokens = (0, jwt_1.generateTokenPair)(user.id, sessionId);
            ctx.cookies.set("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 15
            });
            ctx.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            ctx.status = status_codes_1.STATUS_CODES.CREATED;
            ctx.body = {
                message: constants_1.MESSAGES.ACCOUNT_CREATED,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                sessionId,
                userId: user.id
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async login(ctx) {
        const dto = ctx.request.body;
        const { email, password } = dto;
        try {
            const { user } = await this.loginPort.login({ email, socialChannelId: null, socialChannel: enum_1.SocialChannel.NONE, password });
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: user.id,
                status: enum_1.AccountSessionStatus.ACTIVE,
                deviceType: ctx.userAgent.platform,
                os: ctx.userAgent.os
            });
            ctx.status = status_codes_1.STATUS_CODES.OK;
            const tokens = (0, jwt_1.generateTokenPair)(user.id, sessionId);
            ctx.cookies.set("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 15
            });
            ctx.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = {
                message: constants_1.MESSAGES.LOGIN_SUCCESS,
                sessionId,
                promptPasswordChange: user?.promptPasswordChange,
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async authenticateViaSocial(ctx) {
        const state = JSON.parse(ctx.query.state);
        const user = ctx.state.user;
        try {
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: user.id,
                status: enum_1.AccountSessionStatus.ACTIVE,
                deviceType: ctx.userAgent.platform,
                os: ctx.userAgent.os
            });
            const tokens = (0, jwt_1.generateTokenPair)(user.id, sessionId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = {
                message: constants_1.MESSAGES.AUTHENTICATION_SUCCESS,
                sessionId
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async authenticateViaGoogle(ctx) {
        const { idToken } = ctx.request.body;
        const userAgent = ctx.userAgent || { platform: "Unknown", os: "Unknown" };
        try {
            const { message, accessToken, refreshToken } = await this.googleAuthPort.authenticate(idToken, userAgent);
            ctx.cookies.set("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 15
            });
            ctx.cookies.set("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = { message, accessToken, refreshToken };
        }
        catch (error) {
            ctx.status = status_codes_1.STATUS_CODES.UNAUTHORIZED;
            ctx.body = { message: 'Invalid Google ID token or other error occurred' };
        }
    }
    async requestResetPassword(ctx) {
        const { identifier } = ctx.request.body;
        try {
            const response = await this.requestPasswordResetPort.requestPasswordReset(identifier);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async resetPassword(ctx) {
        const { token, password } = ctx.request.body;
        try {
            const response = await this.resetPasswordPort.resetPassword(token, password);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async refreshToken(ctx) {
        const refreshToken = ctx.cookies.get('refreshToken');
        if (!refreshToken) {
            ctx.status = status_codes_1.STATUS_CODES.UNAUTHORIZED;
            ctx.body = { message: 'Refresh token missing' };
            return;
        }
        try {
            const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
            const { id, sessionId, expired } = decoded;
            const session = await this.accountSessionActivityPersistencePort.findById(sessionId);
            if (!session || session.status === enum_1.AccountSessionStatus.EXPIRED) {
                ctx.status = status_codes_1.STATUS_CODES.UNAUTHORIZED;
                ctx.body = { message: 'Invalid or expired refresh token' };
                return;
            }
            const currentTime = Math.floor(Date.now() / 1000);
            if (expired < currentTime) {
                await this.accountSessionActivityPersistencePort.updateSessionActivityStatusById(sessionId, enum_1.AccountSessionStatus.EXPIRED);
                throw new route_error_1.RouteError(status_codes_1.STATUS_CODES.UNAUTHORIZED, 'Session has expired. Please log in again.');
            }
            const tokens = (0, jwt_1.generateTokenPair)(id, sessionId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.cookies.set("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 15
            });
            ctx.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            ctx.body = {
                message: 'Token refreshed successfully',
                sessionId
            };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async logout(ctx) {
        let sessionId = ctx.request.body?.sessionId;
        if (!sessionId) {
            const accessToken = ctx.cookies.get("accessToken");
            if (accessToken) {
                try {
                    const decoded = (0, jwt_1.verifyAccessToken)(accessToken);
                    sessionId = decoded.sessionId;
                }
                catch (e) {
                }
            }
        }
        if (!sessionId) {
            const refreshToken = ctx.cookies.get("refreshToken");
            if (refreshToken) {
                try {
                    const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
                    sessionId = decoded.sessionId;
                }
                catch (e) {
                }
            }
        }
        try {
            if (sessionId) {
                await this.logoutPort.logout(sessionId, enum_1.AccountSessionStatus.EXPIRED);
            }
            ctx.cookies.set("accessToken", "", {
                httpOnly: true,
                sameSite: "lax",
                expires: new Date(0),
                maxAge: 0
            });
            ctx.cookies.set("refreshToken", "", {
                httpOnly: true,
                sameSite: "lax",
                expires: new Date(0),
                maxAge: 0
            });
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = { message: 'Logged out successfully' };
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async sendOtp(ctx) {
        const { identifier, identifierType, userId } = ctx.request.body;
        try {
            const response = await this.sendOtpPort.sendOtp(identifier, identifierType, userId);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
    async validateOtp(ctx) {
        const { identifier, code, identifierType } = ctx.request.body;
        const otpValidationtype = ctx.query.type;
        try {
            const response = await this.validateOtpPort.validateOtp(identifier, code, identifierType, otpValidationtype);
            ctx.status = status_codes_1.STATUS_CODES.OK;
            ctx.body = response;
        }
        catch (error) {
            (0, utils_1.handleRouteError)(error, ctx, logger);
        }
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RegisterPort")),
    __param(1, (0, tsyringe_1.inject)("LoginPort")),
    __param(2, (0, tsyringe_1.inject)("GoogleAuthPort")),
    __param(3, (0, tsyringe_1.inject)("CreateAccountSessionActivityPort")),
    __param(4, (0, tsyringe_1.inject)("RequestPasswordResetPort")),
    __param(5, (0, tsyringe_1.inject)("ResetPasswordPort")),
    __param(6, (0, tsyringe_1.inject)("LogoutPort")),
    __param(7, (0, tsyringe_1.inject)("SendOtpPort")),
    __param(8, (0, tsyringe_1.inject)("ValidateOtpPort")),
    __param(9, (0, tsyringe_1.inject)("AccountSessionActivityPersistencePort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], AuthController);
