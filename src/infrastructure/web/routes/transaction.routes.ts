import Router from "koa-router";
import { container } from "tsyringe";
import { TransactionController } from "../controllers/transaction.controller";

const transactionRouter = new Router();
const transactionController = container.resolve(TransactionController);

transactionRouter.post("/", (ctx) => transactionController.createTransaction(ctx));
transactionRouter.get("/user", (ctx) => transactionController.findAllTransactionsByUser(ctx));
transactionRouter.get("/:id", (ctx) => transactionController.findTransactionById(ctx));

export { transactionRouter };
