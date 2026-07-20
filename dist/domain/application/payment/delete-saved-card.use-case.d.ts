import { DeleteSavedCardPort } from "@ports/in/payment/delete-saved-card.port";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
export declare class DeleteSavedCardUseCase implements DeleteSavedCardPort {
    private userCardPersistencePort;
    constructor(userCardPersistencePort: UserCardPersistencePort);
    deleteSavedCard(id: string, userId: string): Promise<void>;
}
