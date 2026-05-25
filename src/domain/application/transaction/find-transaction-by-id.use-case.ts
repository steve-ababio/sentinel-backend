import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { FindTransactionByIdPort } from "@ports/in/transaction/find-transaction-by-id.port";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindTransactionByIdUseCase implements FindTransactionByIdPort {
  constructor(
    @inject('TransactionPersistencePort')
    private readonly transactionPersistencePort: TransactionPersistencePort
  ) {}

  async findTransactionById(transactionId: string): Promise<TransactionEntity | null> {
    return this.transactionPersistencePort.findById(transactionId);
  }
}
