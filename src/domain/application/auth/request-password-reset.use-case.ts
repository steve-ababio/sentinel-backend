import { MESSAGES } from "@common/auth/constants";
import { AccountAuthStatus, IdentifierType } from "@common/auth/enum";
import { BaseResponse } from "@common/global/types";
import { RequestPasswordResetPort } from "@ports/in/auth/request-password-reset.port";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { autoInjectable, inject } from "tsyringe";

@autoInjectable()
export class RequestPasswordResetUseCase implements RequestPasswordResetPort {
    constructor(
        @inject('UserPersistencePort') private userPersistencePort: UserPersistencePort,
        @inject('SendOtpPort') private sendOtpPort: SendOtpPort,
    ) { }

    async requestPasswordReset(identifier: string): Promise<BaseResponse> {
        const user = await this.userPersistencePort.findByEmail(identifier)
        if(user){
          this.sendOtpPort.sendOtp(identifier, IdentifierType.EMAIL, user.id as string)
          return { success: true,  message: MESSAGES.PASSWORD_RESET}
        }
        // sending this message regardless for security reasons
        return { success: true,  message: MESSAGES.PASSWORD_RESET}
    }
}