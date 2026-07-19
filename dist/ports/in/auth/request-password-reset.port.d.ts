import { BaseResponse } from "@common/global/types";
export interface RequestPasswordResetPort {
    requestPasswordReset(identifier: string): Promise<BaseResponse>;
}
