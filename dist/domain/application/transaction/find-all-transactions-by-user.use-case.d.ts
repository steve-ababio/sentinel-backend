import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { FindAllTransactionsByUserPort } from "@ports/in/transaction/find-all-transactions-by-user.port";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
export declare class FindAllTransactionsByUserUseCase implements FindAllTransactionsByUserPort {
    private readonly transactionPersistencePort;
    constructor(transactionPersistencePort: TransactionPersistencePort);
    findAllTransactionsByUser(userId: string): Promise<TransactionEntity[]>;
}
