import { inject, autoInjectable } from "tsyringe";
import { DeleteSavedCardPort } from "@ports/in/payment/delete-saved-card.port";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
import { logger } from "@infrastructure/web/util/logger";

@autoInjectable()
export class DeleteSavedCardUseCase implements DeleteSavedCardPort {
    constructor(
        @inject("UserCardPersistencePort")
        private userCardPersistencePort: UserCardPersistencePort
    ) {}

    async deleteSavedCard(id: string, userId: string): Promise<void> {
        try {
            await this.userCardPersistencePort.delete(id, userId);
        } catch (error: any) {
            logger.error(`Error in DeleteSavedCardUseCase for card ${id} and user ${userId}:`, error);
            throw new Error(`Failed to delete saved card: ${error.message}`);
        }
    }
}
