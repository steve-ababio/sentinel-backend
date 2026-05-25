import { inject, autoInjectable } from "tsyringe";
import { SaveUserCardPort } from "@ports/in/payment/save-user-card.port";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { UserCardEntity } from "@domain/models/entities/user-card.entity";
import { logger } from "@infrastructure/web/util/logger";

@autoInjectable()
export class SaveUserCardUseCase implements SaveUserCardPort {
    constructor(
        @inject("UserCardPersistencePort")
        private userCardPersistencePort: UserCardPersistencePort,
        @inject("PaystackPaymentPort")
        private paystackPaymentPort: PaystackPaymentPort
    ) {}

    async saveUserCard(userId: string, reference: string): Promise<UserCardEntity> {
        try {
            // Verify the transaction using Paystack
            const verification = await this.paystackPaymentPort.verifyPayment(reference);

            if (verification.data.status !== 'success') {
                throw new Error("Transaction was not successful");
            }

            const authorization = verification.data.authorization;
            if (!authorization || !authorization.authorization_code) {
                throw new Error("No authorization code found in transaction");
            }

            const userCard = new UserCardEntity(
                userId,
                authorization.authorization_code,
                authorization.last4,
                authorization.brand || authorization.card_type,
                parseInt(authorization.exp_month),
                parseInt(authorization.exp_year),
                true 
            );

            return await this.userCardPersistencePort.save(userCard);
        } catch (error: any) {
            logger.error(`Error saving user card for reference ${reference}:`, error);
            throw new Error(`Failed to save user card: ${error.message}`);
        }
    }
}
