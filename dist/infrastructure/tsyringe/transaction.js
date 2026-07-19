"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const transaction_repository_1 = require("@infrastructure/typeorm/repository/transaction/transaction.repository");
const create_transaction_use_case_1 = require("@domain/application/transaction/create-transaction.use-case");
const find_transaction_by_id_use_case_1 = require("@domain/application/transaction/find-transaction-by-id.use-case");
const find_all_transactions_by_user_use_case_1 = require("@domain/application/transaction/find-all-transactions-by-user.use-case");
tsyringe_1.container.register("TransactionPersistencePort", {
    useClass: transaction_repository_1.TransactionRepository
});
tsyringe_1.container.register("CreateTransactionPort", {
    useClass: create_transaction_use_case_1.CreateTransactionUseCase
});
tsyringe_1.container.register("FindTransactionByIdPort", {
    useClass: find_transaction_by_id_use_case_1.FindTransactionByIdUseCase
});
tsyringe_1.container.register("FindAllTransactionsByUserPort", {
    useClass: find_all_transactions_by_user_use_case_1.FindAllTransactionsByUserUseCase
});
