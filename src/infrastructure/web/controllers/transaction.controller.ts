import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { CreateTransactionPort } from "@ports/in/transaction/create-transaction.port";
import { FindTransactionByIdPort } from "@ports/in/transaction/find-transaction-by-id.port";
import { FindAllTransactionsByUserPort } from "@ports/in/transaction/find-all-transactions-by-user.port";

const logger = createLogger('CONTROLLER', 'TRANSACTION');

@injectable()
export class TransactionController {

    constructor(
        @inject("CreateTransactionPort") private createTransactionPort: CreateTransactionPort,
        @inject("FindTransactionByIdPort") private findTransactionByIdPort: FindTransactionByIdPort,
        @inject("FindAllTransactionsByUserPort") private findAllTransactionsByUserPort: FindAllTransactionsByUserPort
    ) {}

    async createTransaction(ctx: any) {
        try {
            const dto = ctx.request.body;
            const response = await this.createTransactionPort.createTransaction(dto);
            ctx.status = STATUS_CODES.CREATED;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findTransactionById(ctx: any) {
        try {
            const { id } = ctx.params;
            const response = await this.findTransactionByIdPort.findTransactionById(id);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async findAllTransactionsByUser(ctx: any) {
        try {
            const userId = ctx.state.jwtPayload.id;
            const response = await this.findAllTransactionsByUserPort.findAllTransactionsByUser(userId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
