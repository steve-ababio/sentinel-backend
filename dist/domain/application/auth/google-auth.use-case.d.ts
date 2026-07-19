import { GoogleAuthStrategy } from "@infrastructure/google-auth/google-auth.strategy";
import { CreateAccountSessionActivityPort } from "@ports/in/auth/create-account-session-activity.port";
import { GoogleAuthPort } from "@ports/in/auth/google-auth.port";
import { LoginPort } from "@ports/in/auth/login.port";
import { RegisterPort } from "@ports/in/auth/register.port";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
export declare class GoogleAuthUseCase implements GoogleAuthPort {
    private googleAuthStrategy;
    private loginPort;
    private registerPort;
    private createAccountSessionActivityPort;
    private userInfoPersistencePort;
    constructor(googleAuthStrategy: GoogleAuthStrategy, loginPort: LoginPort, registerPort: RegisterPort, createAccountSessionActivityPort: CreateAccountSessionActivityPort, userInfoPersistencePort: UserInfoPersistencePort);
    authenticate(idToken: string, userAgent: any): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
    }>;
}
