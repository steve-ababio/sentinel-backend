import { UserCardEntity } from "@domain/models/entities/user-card.entity";

export interface GetSavedCardsPort {
    getSavedCards(userId: string): Promise<UserCardEntity[]>;
}
