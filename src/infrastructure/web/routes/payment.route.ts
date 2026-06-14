import Router from "koa-router";
import { container } from "tsyringe";
import { PaymentController } from "../controllers/payment.controller";

const paymentController = container.resolve(PaymentController);
export const paymentRouter = new Router();

paymentRouter.get("/callback",(ctx)=> paymentController.handleCallback(ctx));
paymentRouter.post("/webhook",(ctx)=> paymentController.handleWebhook(ctx));
paymentRouter.get("/verify/:reference",(ctx)=> paymentController.verifyPayment(ctx));
