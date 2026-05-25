import { AccountSessionActivityEntity } from "@domain/models/entities/account-session-activity.entity";
import { CreateAccountSessionActivityPort } from "@ports/in/auth/create-account-session-activity.port";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateAccountSessionActivityUseCase implements CreateAccountSessionActivityPort {
  constructor(
    @inject('AccountSessionActivityPersistencePort')
    private readonly accountSessionActivityPersistencePort: AccountSessionActivityPersistencePort
  ) {}

  async createAccountSessionActivity(accountSessionActivity: AccountSessionActivityEntity): Promise<string> {
    return this.accountSessionActivityPersistencePort.cretateaccountSessionActivity(accountSessionActivity);
  }
}
