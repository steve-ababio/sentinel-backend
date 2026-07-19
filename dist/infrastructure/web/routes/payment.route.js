"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const tsyringe_1 = require("tsyringe");
const payment_controller_1 = require("../controllers/payment.controller");
const paymentController = tsyringe_1.container.resolve(payment_controller_1.PaymentController);
exports.paymentRouter = new koa_router_1.default();
exports.paymentRouter.get("/callback", (ctx) => paymentController.handleCallback(ctx));
exports.paymentRouter.post("/webhook", (ctx) => paymentController.handleWebhook(ctx));
exports.paymentRouter.get("/verify/:reference", (ctx) => paymentController.verifyPayment(ctx));
