import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { RegisterPort } from "@ports/in/auth/register.port";
import { generateTokenPair, verifyRefreshToken, verifyAccessToken } from "../util/jwt";
import { LoginPort } from "@ports/in/auth/login.port";
import { CreateAccountSessionActivityPort } from "@ports/in/auth/create-account-session-activity.port";
import { AccountSessionStatus, SocialChannel } from "@common/auth/enum";
import { MESSAGES } from "@common/auth/constants";
import { GoogleAuthPort } from "@ports/in/auth/google-auth.port";
import { RequestPasswordResetPort } from "@ports/in/auth/request-password-reset.port";
import { ResetPasswordPort } from "@ports/in/auth/reset-password.port";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
import { STATUS_CODES } from "@common/web/status-codes";
import { LogoutPort } from "@ports/in/auth/logout.port";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { ValidateOtpPort } from "@ports/in/auth/validate-otp.port";
import { handleRouteError } from "@common/global/utils";
import { RouteError } from "../util/route-error";


const logger = createLogger('CONTROLLER', 'AUTH');

@injectable()
export class AuthController {
    constructor(
        @inject("RegisterPort") 
        private registerPort: RegisterPort,
        @inject("LoginPort")
        private loginPort: LoginPort,
        @inject("GoogleAuthPort")
        private googleAuthPort: GoogleAuthPort,
        @inject("CreateAccountSessionActivityPort")
        private createAccountSessionActivityPort: CreateAccountSessionActivityPort,
        @inject("RequestPasswordResetPort")
        private requestPasswordResetPort: RequestPasswordResetPort,
        @inject("ResetPasswordPort")
        private resetPasswordPort: ResetPasswordPort,
        @inject("LogoutPort")
        private logoutPort: LogoutPort,
        @inject("SendOtpPort")
        private sendOtpPort: SendOtpPort,
        @inject("ValidateOtpPort") 
        private validateOtpPort: ValidateOtpPort,
        @inject("AccountSessionActivityPersistencePort") 
        private accountSessionActivityPersistencePort: AccountSessionActivityPersistencePort
    ) { }

    async register(ctx: any) {
        const dto = ctx.request.body;
        const { email, password } = dto;
        try {
            const user = await this.registerPort.register({ email, socialChannelId: null, socialChannel: SocialChannel.NONE, password });
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: user.id as string,
                status: AccountSessionStatus.ACTIVE,
                deviceType: ctx.userAgent.platform,
                os: ctx.userAgent.os
            })
            const tokens = generateTokenPair(user.id as string, sessionId);
            ctx.cookies.set("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: true,          // true in production (HTTPS)
                sameSite: "none",
                maxAge: 1000 * 60 * 15, // 15 minutes
                path: "/",
            });

            ctx.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
                path: "/",
            });
            ctx.status = STATUS_CODES.CREATED;
            ctx.body = { 
                message: MESSAGES.ACCOUNT_CREATED, 
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                sessionId,
                userId: user.id as string
            };
        } catch (error) {
            handleRouteError(error,ctx,logger);
        }
    }

    async login(ctx: any) {
        const dto = ctx.request.body;
        const { email, password } = dto
        try {
            const {user} = await this.loginPort.login({email, socialChannelId:null, socialChannel:SocialChannel.NONE, password});
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: user.id as string,
                status: AccountSessionStatus.ACTIVE,
                deviceType: ctx.userAgent.platform,
                os: ctx.userAgent.os
            })
            ctx.status = STATUS_CODES.OK;
            const tokens = generateTokenPair(user.id as string, sessionId);

            ctx.cookies.set("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: true,          // true in production (HTTPS)
                sameSite: "none",
                maxAge: 1000 * 60 * 15, // 15 minutes
                path: "/",
            });
    
            ctx.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
            });
    
            ctx.status = STATUS_CODES.OK;
            ctx.body = {
                message: MESSAGES.LOGIN_SUCCESS,
                sessionId,
                promptPasswordChange: user?.promptPasswordChange,
            };
        } catch (error) {
            handleRouteError(error,ctx,logger);
        }
    }


    async authenticateViaSocial(ctx: any) {
        const state = JSON.parse(ctx.query.state as string);
        const user = ctx.state.user;

        try {
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: user.id as string,
                status: AccountSessionStatus.ACTIVE,
                deviceType: ctx.userAgent.platform,
                os: ctx.userAgent.os
            })
            const tokens = generateTokenPair(user.id as string, sessionId)
            ctx.status = STATUS_CODES.OK;
            ctx.body = { 
                message: MESSAGES.AUTHENTICATION_SUCCESS, 
                sessionId
            };
        } catch (error) {
            handleRouteError(error,ctx,logger);
        }
    }

    async authenticateViaGoogle(ctx: any) {
        const { idToken } = ctx.request.body;
        const userAgent = ctx.userAgent || { platform: "Unknown", os: "Unknown" };

        try {
            const { message, accessToken, refreshToken } = await this.googleAuthPort.authenticate(idToken, userAgent);
            
            ctx.cookies.set("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 1000 * 60 * 15 // 15 minutes
            });

            ctx.cookies.set("refreshToken", refreshToken, {
                httpOnly: true,
                secure:true,
                sameSite: "none",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
            });

            ctx.status = STATUS_CODES.OK;
            ctx.body = { message, accessToken, refreshToken };
        } catch (error) {
            ctx.status = STATUS_CODES.UNAUTHORIZED;
            ctx.body = { message: 'Invalid Google ID token or other error occurred' };
        }
    }
    
    async requestResetPassword(ctx: any) {
        const { identifier } = ctx.request.body;
        try {
          const response =  await this.requestPasswordResetPort.requestPasswordReset(identifier);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response
        } catch (error) {
            handleRouteError(error, ctx, logger)
        }
    }

    async resetPassword(ctx: any) {
        const { token, password } = ctx.request.body;
        try {
          const response =  await this.resetPasswordPort.resetPassword(token, password);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response
        } catch (error) {
            handleRouteError(error, ctx, logger)
        }
    }

    async refreshToken(ctx: any) {
        const refreshToken = ctx.cookies.get('refreshToken');
        if (!refreshToken) {
            ctx.status = STATUS_CODES.UNAUTHORIZED;
            ctx.body = { message: 'Refresh token missing' };
            return;
        }
        try {
            const decoded = verifyRefreshToken(refreshToken);
            const { id, sessionId, expired } = decoded;
            const session = await this.accountSessionActivityPersistencePort.findById(sessionId);
            if (!session || session.status === AccountSessionStatus.EXPIRED) {
                ctx.status = STATUS_CODES.UNAUTHORIZED;
                ctx.body = { message: 'Invalid or expired refresh token' };
                return;
            }

            const currentTime = Math.floor(Date.now() / 1000);
            if (expired! < currentTime) {
                await this.accountSessionActivityPersistencePort.updateSessionActivityStatusById(sessionId, AccountSessionStatus.EXPIRED);
                throw new RouteError(STATUS_CODES.UNAUTHORIZED,'Session has expired. Please log in again.');
            }
            
            const tokens = generateTokenPair(id, sessionId);

            ctx.status = STATUS_CODES.OK;

            ctx.cookies.set("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: true,          // true in production (HTTPS)
                sameSite: "none",
                path: "/",
                maxAge: 1000 * 60 * 15 // 15 minutes
            });
    
            ctx.cookies.set("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
            });
    
            ctx.body = {
                message: 'Token refreshed successfully',
                sessionId
            };
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async logout(ctx: any) {
        let sessionId = ctx.request.body?.sessionId;
        if (!sessionId) {
            const accessToken = ctx.cookies.get("accessToken");
            if (accessToken) {
                try {
                    const decoded = verifyAccessToken(accessToken);
                    sessionId = decoded.sessionId;
                } catch (e) {
                    // Ignore and try refresh token next
                }
            }
        }
        
        if (!sessionId) {
            const refreshToken = ctx.cookies.get("refreshToken");
            if (refreshToken) {
                try {
                    const decoded = verifyRefreshToken(refreshToken);
                    sessionId = decoded.sessionId;
                } catch (e) {
                    // Ignore
                }
            }
        }
        
        try {
            if (sessionId) {
                // Update session status to expired in the database
                await this.logoutPort.logout(sessionId, AccountSessionStatus.EXPIRED);
            }
            
            // Clear HTTP-only cookies from client
            ctx.cookies.set("accessToken", "", {
                httpOnly: true,
                sameSite: "none",
                expires: new Date(0),
                maxAge: 0
            });
            
            ctx.cookies.set("refreshToken", "", {
                httpOnly: true,
                sameSite: "none",
                expires: new Date(0),
                maxAge: 0,
                
            });
            
            ctx.status = STATUS_CODES.OK;
            ctx.body = { message: 'Logged out successfully' };
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async sendOtp(ctx: any) {
        const { identifier, identifierType, userId } = ctx.request.body;
        try {
            const response = await this.sendOtpPort.sendOtp(identifier, identifierType, userId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async validateOtp(ctx: any) {
        const { identifier, code, identifierType } = ctx.request.body;
         const otpValidationtype = ctx.query.type;
        try {
            const response = await this.validateOtpPort.validateOtp(identifier, code, identifierType,otpValidationtype);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}