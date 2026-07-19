import { ResetPasswordPort } from "@ports/in/auth/reset-password.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { BaseResponse } from "@common/global/types";
import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";
export declare class ResetPasswordResetUseCase implements ResetPasswordPort {
    private userPersistencePort;
    private sendEmailNotificationPort;
    constructor(userPersistencePort: UserPersistencePort, sendEmailNotificationPort: SendEmailNotificationPort);
    resetPassword(resetToken: string, newPassword: string): Promise<BaseResponse>;
    private hash;
}
