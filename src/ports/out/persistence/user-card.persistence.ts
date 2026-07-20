import { UserCardEntity } from "@domain/models/entities/user-card.entity";

export interface UserCardPersistencePort {
  save(userCard: UserCardEntity): Promise<UserCardEntity>;
  findByUserId(userId: string): Promise<UserCardEntity[]>;
  delete(id: string, userId: string): Promise<void>;
}
