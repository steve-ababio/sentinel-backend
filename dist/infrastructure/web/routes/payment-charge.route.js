"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentChargeRouter = void 0;
const tsyringe_1 = require("tsyringe");
const payment_controller_1 = require("../controllers/payment.controller");
const koa_router_1 = __importDefault(require("koa-router"));
const paymentController = tsyringe_1.container.resolve(payment_controller_1.PaymentController);
exports.paymentChargeRouter = new koa_router_1.default();
exports.paymentChargeRouter.get("/saved-cards", (ctx) => paymentController.getSavedCards(ctx));
exports.paymentChargeRouter.post("/save-card", (ctx) => paymentController.saveCard(ctx));
exports.paymentChargeRouter.post("/charge", (ctx) => paymentController.chargeCard(ctx));
exports.paymentChargeRouter.post("/charge-momo", (ctx) => paymentController.chargeMobileMoney(ctx));
exports.paymentChargeRouter.get("/history", (ctx) => paymentController.getPaymentHistory(ctx));
