import { CurrencyCodes } from "@common/user/enum";
export declare class PlanEntity {
    name: string;
    price: number;
    currency: CurrencyCodes;
    interval: string;
    trialDays: string;
    constructor(name: string, price: number, currency: CurrencyCodes, interval: string, trialDays: string);
}
