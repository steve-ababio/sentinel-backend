import { SubscriptionStatus } from "@common/global/types";
import { PlanEntity } from "./plan.entity";

export class SubscriptionEntity {
    constructor(
      public userId: string,
      public plan: Partial<PlanEntity>,
      public transactionId: string,
      public status: SubscriptionStatus,
      public subscribedAt: string,
      public expiresAt?: string,
      public trialEndsAt?: string,
    ) {}

}