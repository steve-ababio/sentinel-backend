import { UserCardEntity } from "@domain/models/entities/user-card.entity";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
export declare class UserCardRepositoryAdapter implements UserCardPersistencePort {
    private repository;
    constructor();
    private toDomain;
    private toEntity;
    save(userCard: UserCardEntity): Promise<UserCardEntity>;
    findByUserId(userId: string): Promise<UserCardEntity[]>;
    delete(id: string, userId: string): Promise<void>;
}
