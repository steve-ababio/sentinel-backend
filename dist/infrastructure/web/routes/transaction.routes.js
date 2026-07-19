"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const transaction_controller_1 = require("../controllers/transaction.controller");
const transactionRouter = new koa_router_1.default();
exports.transactionRouter = transactionRouter;
const transactionController = tsyringe_1.container.resolve(transaction_controller_1.TransactionController);
transactionRouter.post("/", (ctx) => transactionController.createTransaction(ctx));
transactionRouter.get("/user", (ctx) => transactionController.findAllTransactionsByUser(ctx));
transactionRouter.get("/:id", (ctx) => transactionController.findTransactionById(ctx));
