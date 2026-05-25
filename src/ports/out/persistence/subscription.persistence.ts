import { BaseResponse } from "@common/global/types";
import { SubscriptionEntity } from "@domain/models/entities/subscription.entity";

export interface SubscriptionPersistencePort {
    create(subscription: SubscriptionEntity): Promise<SubscriptionEntity>;
    update(subscription: SubscriptionEntity): Promise<BaseResponse>;
    expireSubscriptions():Promise<BaseResponse>;
    findActiveSubscription(userId:string):Promise<SubscriptionEntity|null>;
    findById(id: string): Promise<SubscriptionEntity | null>;
    findByTransactionId(transactionId: string): Promise<SubscriptionEntity | null>;
}