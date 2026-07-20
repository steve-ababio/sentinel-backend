import { container } from "tsyringe";
import { PaymentController } from "../controllers/payment.controller";
import Router from "koa-router";

const paymentController = container.resolve(PaymentController);
export const paymentChargeRouter = new Router();

paymentChargeRouter.get("/saved-cards",(ctx)=> paymentController.getSavedCards(ctx));
paymentChargeRouter.delete("/saved-cards/:id",(ctx)=> paymentController.deleteSavedCard(ctx));
paymentChargeRouter.post("/save-card",(ctx)=> paymentController.saveCard(ctx));
paymentChargeRouter.post("/charge",(ctx)=> paymentController.chargeCard(ctx));
paymentChargeRouter.post("/charge-momo",(ctx)=> paymentController.chargeMobileMoney(ctx));
paymentChargeRouter.get("/history",(ctx)=> paymentController.getPaymentHistory(ctx));
