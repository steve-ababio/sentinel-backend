import { TransactionEntity } from "@domain/models/entities/transaction.entity";

export interface FindAllTransactionsByUserPort {
    findAllTransactionsByUser(userId: string): Promise<TransactionEntity[]>;
}
