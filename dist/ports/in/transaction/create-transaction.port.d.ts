import { TransactionEntity } from "@domain/models/entities/transaction.entity";
export interface CreateTransactionPort {
    createTransaction(transaction: TransactionEntity): Promise<TransactionEntity>;
}
