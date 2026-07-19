import { SubscriptionStatus } from "@common/global/types";
import { PlanEntity } from "./plan.entity";
export declare class SubscriptionEntity {
    userId: string;
    plan: Partial<PlanEntity>;
    transactionId: string;
    status: SubscriptionStatus;
    subscribedAt: string;
    expiresAt?: string | undefined;
    trialEndsAt?: string | undefined;
    constructor(userId: string, plan: Partial<PlanEntity>, transactionId: string, status: SubscriptionStatus, subscribedAt: string, expiresAt?: string | undefined, trialEndsAt?: string | undefined);
}
