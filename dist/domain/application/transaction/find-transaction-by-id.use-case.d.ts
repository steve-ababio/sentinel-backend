import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { FindTransactionByIdPort } from "@ports/in/transaction/find-transaction-by-id.port";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
export declare class FindTransactionByIdUseCase implements FindTransactionByIdPort {
    private readonly transactionPersistencePort;
    constructor(transactionPersistencePort: TransactionPersistencePort);
    findTransactionById(transactionId: string): Promise<TransactionEntity | null>;
}
