import { CurrencyCodes } from "@common/user/enum";

export class PlanEntity {
    constructor(
      public name: string,
      public price: number,
      public currency:CurrencyCodes,
      public interval: string,
      public trialDays: string,
    ) {}

}