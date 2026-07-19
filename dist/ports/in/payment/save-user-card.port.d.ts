import { UserCardEntity } from "@domain/models/entities/user-card.entity";
export interface SaveUserCardPort {
    saveUserCard(userId: string, reference: string): Promise<UserCardEntity>;
}
