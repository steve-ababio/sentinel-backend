import { IdentifierType } from "@common/auth/enum";
import { ValidateOtpPort } from "@ports/in/auth/validate-otp.port";
import { OtpPersistencePort } from "@ports/out/persistence/otp.persistence";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { BaseResponse } from "@common/global/types";
import { OtpValidationType } from "@common/user/enum";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
export declare class ValidateOtpUseCase implements ValidateOtpPort {
    private otpPersistencePort;
    private contactPersistencePort;
    private userPersistencePort;
    constructor(otpPersistencePort: OtpPersistencePort, contactPersistencePort: ContactPersistencePort, userPersistencePort: UserPersistencePort);
    validateOtp(identifier: string, code: string, identifierType: IdentifierType, otpValidationtype: OtpValidationType): Promise<BaseResponse>;
}
