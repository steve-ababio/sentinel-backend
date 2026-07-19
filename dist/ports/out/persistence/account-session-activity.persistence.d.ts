import { BaseResponse } from "@common/global/types";
import { AccountSessionStatus } from "@common/auth/enum";
import { AccountSessionActivityEntity } from "@domain/models/entities/account-session-activity.entity";
export interface AccountSessionActivityPersistencePort {
    cretateaccountSessionActivity(accountSessionActivity: AccountSessionActivityEntity): Promise<string>;
    updateSessionActivityStatusById(sessionId: string, status: AccountSessionStatus): Promise<BaseResponse>;
    findById(id: string): Promise<AccountSessionActivityEntity | null>;
    invalidateActiveSessions(userId: string, currentSessionId?: string): Promise<void>;
}
