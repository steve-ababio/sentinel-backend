import { BaseResponse } from "@common/global/types";
import { AccountSessionStatus } from "@common/auth/enum";
import { AccountSessionActivityEntity } from "@domain/models/entities/account-session-activity.entity";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
export declare class AccountSessionActivityRepository implements AccountSessionActivityPersistencePort {
    private toPersistence;
    private toDomain;
    cretateaccountSessionActivity(accountSessionActivity: AccountSessionActivityEntity): Promise<string>;
    updateSessionActivityStatusById(sessionId: string, status: AccountSessionStatus): Promise<BaseResponse>;
    findById(id: string): Promise<AccountSessionActivityEntity | null>;
    invalidateActiveSessions(userId: string, currentSessionId?: string): Promise<void>;
}
