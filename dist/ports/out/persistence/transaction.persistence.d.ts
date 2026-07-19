import { TransactionEntity } from "@domain/models/entities/transaction.entity";
export interface TransactionPersistencePort {
    create(transaction: TransactionEntity): Promise<TransactionEntity>;
    findById(transactionId: string): Promise<TransactionEntity | null>;
    update(transaction: TransactionEntity): Promise<boolean>;
    findAllByUserId(userId: string): Promise<TransactionEntity[]>;
}
