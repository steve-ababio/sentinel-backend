import { CreateTransactionPort } from "@ports/in/transaction/create-transaction.port";
import { FindTransactionByIdPort } from "@ports/in/transaction/find-transaction-by-id.port";
import { FindAllTransactionsByUserPort } from "@ports/in/transaction/find-all-transactions-by-user.port";
export declare class TransactionController {
    private createTransactionPort;
    private findTransactionByIdPort;
    private findAllTransactionsByUserPort;
    constructor(createTransactionPort: CreateTransactionPort, findTransactionByIdPort: FindTransactionByIdPort, findAllTransactionsByUserPort: FindAllTransactionsByUserPort);
    createTransaction(ctx: any): Promise<void>;
    findTransactionById(ctx: any): Promise<void>;
    findAllTransactionsByUser(ctx: any): Promise<void>;
}
