import { BaseResponse } from "@common/global/types";
import { IdentifierType, OtpValidationType } from "@common/user/enum";
export interface ValidateOtpPort {
    validateOtp(identifier: string, code: string, identifierType: IdentifierType, otpValidationtype: OtpValidationType): Promise<BaseResponse>;
}
