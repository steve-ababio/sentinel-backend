import { AccountAuthStatus, IdentifierType, OtpStatus } from "@common/auth/enum";
import { createLogger } from "@infrastructure/web/util/logger";
import { RouteError } from "@infrastructure/web/util/route-error";
import { ValidateOtpPort } from "@ports/in/auth/validate-otp.port";
import { OtpPersistencePort } from "@ports/out/persistence/otp.persistence";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { autoInjectable, inject } from "tsyringe";
import { BaseResponse } from "@common/global/types";
import { UserEntity } from "@domain/models/entities/user.entity";
import { generateResetToken } from "@infrastructure/web/util/jwt";
import { STATUS_CODES } from "@common/web/status-codes";
import { OTP_ERROR_MESSAGES } from "@common/user/constants";
import { ContactStatus, OtpValidationType } from "@common/user/enum";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
const logger = createLogger('USE_CASE', 'SENT_OTP');

@autoInjectable()
export class ValidateOtpUseCase implements ValidateOtpPort {
    constructor(
        @inject('OtpPersistencePort')
        private otpPersistencePort: OtpPersistencePort,
        @inject('ContactPersistencePort')
        private contactPersistencePort: ContactPersistencePort,
        @inject('UserPersistencePort')
        private userPersistencePort: UserPersistencePort,
    ) { }


    async validateOtp(identifier: string, code: string, identifierType: IdentifierType,otpValidationtype:OtpValidationType): Promise<BaseResponse> {
        const otp = await this.otpPersistencePort.findActiveOtpByIdentifier(identifier, identifierType);
        if(!otp){
            throw new RouteError(STATUS_CODES.BAD_REQUEST, OTP_ERROR_MESSAGES.INVALID_OTP);
        }
        if (otp.expiresAt < new Date()) {
            throw new RouteError(STATUS_CODES.BAD_REQUEST, OTP_ERROR_MESSAGES.OTP_EXPIRED);
        }

        if (otp.attempts >= parseInt(process.env.OTP_VALIDATION_ATTEMPT as string,10)) {
            throw new RouteError(STATUS_CODES.BAD_REQUEST, OTP_ERROR_MESSAGES.MAXIMUM_ATTEMPTS_EXCEEDED);
        }

        if (otp.code !== btoa(code)) {
            otp.attempts += 1;
            await this.otpPersistencePort.update(otp.id as string, { attempts: otp.attempts });
            throw new RouteError(STATUS_CODES.BAD_REQUEST, OTP_ERROR_MESSAGES.OTP_USED);
        }

        await this.otpPersistencePort.update(otp.id as string, { status: OtpStatus.USED });
        const user = await this.userPersistencePort.findById(otp.userId!) as UserEntity

        if (otpValidationtype === OtpValidationType.CONTACT_VALIDATION) {
            await this.contactPersistencePort.save({ userId: user?.id as string, identifier, identifierType, status: ContactStatus.VERIFIED})
            return { success: true }

        } else if (otpValidationtype === OtpValidationType.PASSWORD_RESET) {
            await this.userPersistencePort.updateAccountAuthStatus(user.id as string, AccountAuthStatus.PASSWORD_RESET)
            const token = generateResetToken(user.id as string)
            return { success: true, details: { token } }
        }
        return { success: false }
    }
}