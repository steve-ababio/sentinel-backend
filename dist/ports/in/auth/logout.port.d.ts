import { AccountSessionStatus } from "@common/auth/enum";
import { BaseResponse } from "@common/global/types";
export interface LogoutPort {
    logout(sessionId: string, status: AccountSessionStatus): Promise<BaseResponse>;
}
