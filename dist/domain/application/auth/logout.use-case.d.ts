import { AccountSessionStatus } from "@common/auth/enum";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
import { BaseResponse } from "@common/global/types";
import { LogoutPort } from "@ports/in/auth/logout.port";
export declare class LogoutUseCase implements LogoutPort {
    private accountSessionActivityPersistencePort;
    constructor(accountSessionActivityPersistencePort: AccountSessionActivityPersistencePort);
    logout(sessionId: string, status: AccountSessionStatus): Promise<BaseResponse>;
}
