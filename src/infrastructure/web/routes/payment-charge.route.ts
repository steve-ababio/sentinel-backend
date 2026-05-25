import { container } from "tsyringe";
import { PaymentController } from "../controllers/payment.controller";
import Router from "koa-router";

const paymentController = container.resolve(PaymentController);
export const paymentChargeRouter = new Router();

paymentChargeRouter.get("/saved-cards",(ctx)=> paymentController.getSavedCards(ctx));
paymentChargeRouter.post("/save-card",(ctx)=> paymentController.saveCard(ctx));
paymentChargeRouter.post("/charge",(ctx)=> paymentController.chargeCard(ctx));
paymentChargeRouter
