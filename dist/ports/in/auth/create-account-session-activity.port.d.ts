import { AccountSessionActivityEntity } from "@domain/models/entities/account-session-activity.entity";
export interface CreateAccountSessionActivityPort {
    createAccountSessionActivity(accountSessionActivity: AccountSessionActivityEntity): Promise<string>;
}
