import { BaseResponse } from "@common/global/types";
export interface ResetPasswordPort {
    resetPassword(resetToken: string, newPassword: string): Promise<BaseResponse>;
}
