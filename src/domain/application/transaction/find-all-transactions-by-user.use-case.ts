import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { FindAllTransactionsByUserPort } from "@ports/in/transaction/find-all-transactions-by-user.port";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllTransactionsByUserUseCase implements FindAllTransactionsByUserPort {
    constructor(
        @inject("TransactionPersistencePort")
        private readonly transactionPersistencePort: TransactionPersistencePort
    ) {}

    async findAllTransactionsByUser(userId: string): Promise<TransactionEntity[]> {
        return this.transactionPersistencePort.findAllByUserId(userId);
    }
}
