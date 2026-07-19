import { TransactionEntity } from "@domain/models/entities/transaction.entity";
export interface FindTransactionByIdPort {
    findTransactionById(transactionId: string): Promise<TransactionEntity | null>;
}
