import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { UserCard } from "../entities/user-card/user-card.entity";
import { UserCardEntity } from "@domain/models/entities/user-card.entity";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";

@injectable()
export class UserCardRepositoryAdapter implements UserCardPersistencePort {
  private repository: Repository<UserCard>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserCard);
  }

  private toDomain(entity: UserCard): UserCardEntity {
    return new UserCardEntity(
      entity.user?.id as string,
      entity.cardToken,
      entity.last4,
      entity.brand,
      entity.expMonth,
      entity.expYear,
      entity.isDefault,
      entity.id as string
    );
  }

  private toEntity(domain: UserCardEntity): UserCard {
    const entity = new UserCard();
    if (domain.id) entity.id = domain.id;
    entity.user = { id: domain.userId } as any;
    entity.cardToken = domain.cardToken;
    entity.last4 = domain.last4;
    entity.brand = domain.brand;
    entity.expMonth = domain.expMonth;
    entity.expYear = domain.expYear;
    entity.isDefault = domain.isDefault;
    return entity;
  }

  async save(userCard: UserCardEntity): Promise<UserCardEntity> {
    const entity = this.toEntity(userCard);
    const savedEntity = await this.repository.save(entity);
    // When saved, we might not have user loaded entirely, but we have userId from domain
    savedEntity.user = { id: userCard.userId } as any;
    return this.toDomain(savedEntity);
  }

  async findByUserId(userId: string): Promise<UserCardEntity[]> {
    const entities = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
    return entities.map(e => this.toDomain(e));
  }
}
