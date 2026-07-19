import { BaseResponse } from "@common/global/types";
import { RequestPasswordResetPort } from "@ports/in/auth/request-password-reset.port";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
export declare class RequestPasswordResetUseCase implements RequestPasswordResetPort {
    private userPersistencePort;
    private sendOtpPort;
    constructor(userPersistencePort: UserPersistencePort, sendOtpPort: SendOtpPort);
    requestPasswordReset(identifier: string): Promise<BaseResponse>;
}
