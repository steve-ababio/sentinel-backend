import { AccountSessionStatus } from "@common/auth/enum";

export class AccountSessionActivityEntity {
    constructor(
      public userId: string,
      public deviceType: string,
      public os: string,
      public status: AccountSessionStatus,
      public id?: string
    ) {}
  }