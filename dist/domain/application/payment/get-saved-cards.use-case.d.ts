import { GetSavedCardsPort } from "@ports/in/payment/get-saved-cards.port";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
import { UserCardEntity } from "@domain/models/entities/user-card.entity";
export declare class GetSavedCardsUseCase implements GetSavedCardsPort {
    private userCardPersistencePort;
    constructor(userCardPersistencePort: UserCardPersistencePort);
    getSavedCards(userId: string): Promise<UserCardEntity[]>;
}
