import { BaseEntity } from "../base/base.entity";
import { CurrencyCodes } from "@common/user/enum";
import { Subscription } from "../subscription/subscription.entity";
export declare class Plan extends BaseEntity {
    name: string;
    price: number;
    currency: CurrencyCodes;
    interval: string;
    trialDays: number;
    subscriptions: Subscription[];
}
