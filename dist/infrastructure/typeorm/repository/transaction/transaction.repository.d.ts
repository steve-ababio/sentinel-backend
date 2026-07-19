import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
export declare class TransactionRepository implements TransactionPersistencePort {
    private toPersistence;
    private toDomain;
    create(transactionEntity: TransactionEntity): Promise<TransactionEntity>;
    private fallbackCourseTitles;
    findById(transactionId: string): Promise<TransactionEntity | null>;
    update(transaction: TransactionEntity): Promise<boolean>;
    findAllByUserId(userId: string): Promise<TransactionEntity[]>;
}
