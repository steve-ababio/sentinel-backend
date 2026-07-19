import { BaseResponse } from "@common/global/types";
import { IdentifierType } from "@common/user/enum";
export interface SendOtpPort {
    sendOtp(identifier: string, identifierType: IdentifierType, userId?: string): Promise<BaseResponse>;
}
