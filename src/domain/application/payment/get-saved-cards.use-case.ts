import { inject, autoInjectable } from "tsyringe";
import { GetSavedCardsPort } from "@ports/in/payment/get-saved-cards.port";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
import { UserCardEntity } from "@domain/models/entities/user-card.entity";
import { logger } from "@infrastructure/web/util/logger";

@autoInjectable()
export class GetSavedCardsUseCase implements GetSavedCardsPort {
    constructor(
        @inject("UserCardPersistencePort")
        private userCardPersistencePort: UserCardPersistencePort
    ) {}

    async getSavedCards(userId: string): Promise<UserCardEntity[]> {
        try {
            return await this.userCardPersistencePort.findByUserId(userId);
        } catch (error: any) {
            logger.error(`Error in GetSavedCardsUseCase for user ${userId}:`, error);
            throw new Error(`Failed to fetch saved cards: ${error.message}`);
        }
    }
}
