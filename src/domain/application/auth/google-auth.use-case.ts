



import { MESSAGES } from "@common/auth/constants";
import { AccountSessionStatus, SocialChannel } from "@common/auth/enum";
import { GoogleAuthStrategy } from "@infrastructure/google-auth/google-auth.strategy";
import { generateTokenPair } from "@infrastructure/web/util/jwt";
import { logger } from "@infrastructure/web/util/logger";
import { CreateAccountSessionActivityPort } from "@ports/in/auth/create-account-session-activity.port";
import { GoogleAuthPort } from "@ports/in/auth/google-auth.port";
import { LoginPort } from "@ports/in/auth/login.port";
import { RegisterPort } from "@ports/in/auth/register.port";
import { inject, injectable } from "tsyringe";
@injectable()
export class GoogleAuthUseCase implements GoogleAuthPort {
    constructor(
        @inject("GoogleAuthStrategy") private googleAuthStrategy: GoogleAuthStrategy,
        @inject("LoginPort")private loginPort: LoginPort,
        @inject("RegisterPort") private registerPort: RegisterPort,
        @inject("CreateAccountSessionActivityPort") private createAccountSessionActivityPort: CreateAccountSessionActivityPort
    ) {}

    async authenticate(idToken: string, userAgent: any): Promise<{ message: string, accessToken: string, refreshToken: string }> {
        try {
            // Verify token and get user information from Google
            const { email, id: socialChannelId, displayName } = await this.googleAuthStrategy.verifyToken(idToken);
            let loginResponse;

            try {
                // Attempt to log in the user
                loginResponse = await this.loginPort.login({email:email as string, socialChannelId, socialChannel: SocialChannel.GOOGLE});
            } catch (error: any) {
                // Register the user if login fails
                if (error.message === MESSAGES.INVALID_EMAIL_PASSWORD) {
                    const user = await this.registerPort.register({
                        email: email as string,
                        socialChannelId,
                        socialChannel: SocialChannel.GOOGLE,
                    });
                    loginResponse = { user };
                } else {
                    logger.error(error)
                    throw error; // Re-throw any other errors
                }
            }

            // Create session activity and generate token pair
            const sessionId = await this.createAccountSessionActivityPort.createAccountSessionActivity({
                userId: loginResponse!.user.id as string,
                status: AccountSessionStatus.ACTIVE,
                deviceType: userAgent.platform,
                os: userAgent.os,
            });
            const tokens = generateTokenPair(loginResponse!.user.id as string, sessionId);

            return { message: MESSAGES.LOGIN_SUCCESS, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };

        } catch (error) {
            logger.error(error);
            throw new Error('Invalid Google ID token or other error occurred');
        }
    }
}