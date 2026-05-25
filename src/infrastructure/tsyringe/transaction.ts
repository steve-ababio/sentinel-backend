import { container } from "tsyringe";

import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
import { TransactionRepository } from "@infrastructure/typeorm/repository/transaction/transaction.repository";

import { CreateTransactionPort } from "@ports/in/transaction/create-transaction.port";
import { CreateTransactionUseCase } from "@domain/application/transaction/create-transaction.use-case";

import { FindTransactionByIdPort } from "@ports/in/transaction/find-transaction-by-id.port";
import { FindTransactionByIdUseCase } from "@domain/application/transaction/find-transaction-by-id.use-case";

import { FindAllTransactionsByUserPort } from "@ports/in/transaction/find-all-transactions-by-user.port";
import { FindAllTransactionsByUserUseCase } from "@domain/application/transaction/find-all-transactions-by-user.use-case";

container.register<TransactionPersistencePort>("TransactionPersistencePort", {
    useClass: TransactionRepository
});

container.register<CreateTransactionPort>("CreateTransactionPort", {
    useClass: CreateTransactionUseCase
});

container.register<FindTransactionByIdPort>("FindTransactionByIdPort", {
    useClass: FindTransactionByIdUseCase
});

container.register<FindAllTransactionsByUserPort>("FindAllTransactionsByUserPort", {
    useClass: FindAllTransactionsByUserUseCase
});
