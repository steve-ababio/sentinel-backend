import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { CreateTransactionPort } from "@ports/in/transaction/create-transaction.port";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
export declare class CreateTransactionUseCase implements CreateTransactionPort {
    private readonly transactionPersistencePort;
    constructor(transactionPersistencePort: TransactionPersistencePort);
    createTransaction(transaction: TransactionEntity): Promise<TransactionEntity>;
}
