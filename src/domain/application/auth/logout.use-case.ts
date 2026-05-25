import { AccountSessionStatus } from "@common/auth/enum";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
import { autoInjectable, inject } from "tsyringe";
import {BaseResponse} from "@common/global/types";
import { LogoutPort } from "@ports/in/auth/logout.port";


@autoInjectable()
export class LogoutUseCase implements LogoutPort {
    constructor(
        @inject('AccountSessionActivityPersistencePort')
        private accountSessionActivityPersistencePort: AccountSessionActivityPersistencePort){
    }
    logout(sessionId: string, status: AccountSessionStatus): Promise<BaseResponse> {
        return  this.accountSessionActivityPersistencePort.updateSessionActivityStatusById(sessionId, status)
        
    }

}
