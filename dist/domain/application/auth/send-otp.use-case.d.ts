import { IdentifierType } from "@common/auth/enum";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { OtpPersistencePort } from "@ports/out/persistence/otp.persistence";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { BaseResponse } from "@common/global/types";
import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";
export declare class SendOtpUseCase implements SendOtpPort {
    private otpPersistencePort;
    private userPersistencePort;
    private sendEmailNotificationPort;
    constructor(otpPersistencePort: OtpPersistencePort, userPersistencePort: UserPersistencePort, sendEmailNotificationPort: SendEmailNotificationPort);
    sendOtp(identifier: string, identifierType: IdentifierType, userId?: string): Promise<BaseResponse>;
    sendOtpToUser(identifier: string, code: string, identifierType: IdentifierType): Promise<void>;
}
