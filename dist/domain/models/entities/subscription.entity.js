"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionEntity = void 0;
class SubscriptionEntity {
    constructor(userId, plan, transactionId, status, subscribedAt, expiresAt, trialEndsAt) {
        this.userId = userId;
        this.plan = plan;
        this.transactionId = transactionId;
        this.status = status;
        this.subscribedAt = subscribedAt;
        this.expiresAt = expiresAt;
        this.trialEndsAt = trialEndsAt;
    }
}
exports.SubscriptionEntity = SubscriptionEntity;
