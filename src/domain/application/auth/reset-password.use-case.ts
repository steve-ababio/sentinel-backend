import { MESSAGES } from "@common/auth/constants";
import { verifyResetToken } from "@infrastructure/web/util/jwt";
import { RouteError } from "@infrastructure/web/util/route-error";
import { ResetPasswordPort } from "@ports/in/auth/reset-password.port"
import { UserPersistencePort } from "@ports/out/persistence/user.persistence"
import { autoInjectable, inject } from "tsyringe"
import bcrypt from 'bcrypt';
import { BaseResponse } from "@common/global/types";
import { UserEntity } from "@domain/models/entities/user.entity";
import { AccountAuthStatus } from "@common/auth/enum";
import { SendEmailNotificationPort } from "@ports/out/notification/send-email.notification";
import { STATUS_CODES } from "@common/web/status-codes";

@autoInjectable()
export class ResetPasswordResetUseCase implements ResetPasswordPort {
    constructor(
        @inject('UserPersistencePort') private userPersistencePort: UserPersistencePort,
        @inject('SendEmailNotificationPort') private sendEmailNotificationPort: SendEmailNotificationPort,
        
    ) { }

    async resetPassword(resetToken: string, newPassword: string): Promise<BaseResponse> {
        const userId = verifyResetToken(resetToken)
        if(!userId){
            throw new RouteError(STATUS_CODES.UNAUTHORIZED, MESSAGES.RESET_TOKEN_EXPIRED);
        }
        const hashedPassword = await this.hash(newPassword as string);
        const userPaasswordUpdate = await this.userPersistencePort.updatePassword(userId,hashedPassword)
        const user = await this.userPersistencePort.findById(userId) as UserEntity
        await this.userPersistencePort.updateAccountAuthStatus(user.id as string, AccountAuthStatus.OK)
        await this.sendEmailNotificationPort.sendPasswordResetEmail(user?.email,'Password reset success', 'Your password has been updated successfully','Password reset success');
        return userPaasswordUpdate

    }
    private async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}