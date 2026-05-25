import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { CreateTransactionPort } from "@ports/in/transaction/create-transaction.port";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateTransactionUseCase implements CreateTransactionPort {
  constructor(
    @inject('TransactionPersistencePort')
    private readonly transactionPersistencePort: TransactionPersistencePort
  ) {}

  async createTransaction(transaction: TransactionEntity): Promise<TransactionEntity> {
    return this.transactionPersistencePort.create(transaction);
  }
}
