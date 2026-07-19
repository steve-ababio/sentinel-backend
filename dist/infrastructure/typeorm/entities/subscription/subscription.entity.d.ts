import { BaseEntity } from "../base/base.entity";
import { SubscriptionStatus } from "@common/global/types";
import { Plan } from "../plan/plan.entity";
import { User } from "../user/user.entity";
export declare class Subscription extends BaseEntity {
    user: User;
    plan: Plan;
    transactionId: string;
    status: SubscriptionStatus;
    trialEndsAt: Date;
    subscribedAt: Date;
    expiresAt?: Date;
}
