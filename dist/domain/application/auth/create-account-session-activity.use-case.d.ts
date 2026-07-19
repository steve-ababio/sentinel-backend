import { AccountSessionActivityEntity } from "@domain/models/entities/account-session-activity.entity";
import { CreateAccountSessionActivityPort } from "@ports/in/auth/create-account-session-activity.port";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
export declare class CreateAccountSessionActivityUseCase implements CreateAccountSessionActivityPort {
    private readonly accountSessionActivityPersistencePort;
    constructor(accountSessionActivityPersistencePort: AccountSessionActivityPersistencePort);
    createAccountSessionActivity(accountSessionActivity: AccountSessionActivityEntity): Promise<string>;
}
