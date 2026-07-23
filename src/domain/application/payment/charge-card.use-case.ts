import { inject, autoInjectable } from "tsyringe";
import { ChargeCardPort } from "@ports/in/payment/charge-card.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
import { UserCardEntity } from "@domain/models/entities/user-card.entity";
import { logger } from "@infrastructure/web/util/logger";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { RouteError } from "@infrastructure/error/route-error";

@autoInjectable()
export class ChargeCardUseCase implements ChargeCardPort {
    constructor(
        @inject("PaystackPaymentPort")
        private paystackPaymentPort: PaystackPaymentPort,
        @inject("UserCardPersistencePort")
        private userCardPersistencePort: UserCardPersistencePort,
        @inject("UserPersistencePort")
        private userPersistencePort: UserPersistencePort
    ) {}

    async chargeCard(userId: string, cardDetails: any, amount: number, courseId: string): Promise<any> {
        try {
            const user = await this.userPersistencePort.findById(userId);
            if(!user){
                throw new RouteError(404,"User not found");
            }
            const metadata = { userId, courseId };
            let response;
            
            if (cardDetails.authorization_code) {
                // Charge using a saved card token
                response = await this.paystackPaymentPort.chargeAuthorization(cardDetails.authorization_code, user.email, amount, metadata);
            } else {
                // Charge using raw card details
                response = await this.paystackPaymentPort.chargeCard(cardDetails, user.email, amount, metadata);
            }
            
            // If the charge succeeds immediately, save the card (only if it's a new card)
            if (!cardDetails.authorization_code && response.status === true && response.data?.status === 'success') {
                const authorization = response.data.authorization;
                if (authorization && authorization.authorization_code) {
                    const userCard = new UserCardEntity(
                        userId,
                        authorization.authorization_code,
                        authorization.last4,
                        authorization.brand || authorization.card_type,
                        parseInt(authorization.exp_month),
                        parseInt(authorization.exp_year),
                        true
                    );
                    await this.userCardPersistencePort.save(userCard);
                }
            }
            
            // If it returns pending, send_otp, send_pin, etc., the frontend will handle it
            return response;
        } catch (error: any) {
            logger.error(`Error in ChargeCardUseCase for user ${userId}:`, error);
            throw new Error(`Charge failed: ${error.message}`);
        }
    }
}
