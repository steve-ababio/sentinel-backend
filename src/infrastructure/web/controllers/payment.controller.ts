import { inject, injectable } from "tsyringe";
import { createLogger } from "../util/logger";
import { MESSAGES } from "@common/auth/constants";
import { PaystackCallbackPort } from "@ports/in/payment/paystack-callback.port";
import { PaystackWebhookPort } from "@ports/in/payment/paystack-webhook.port";
import { SaveUserCardPort } from "@ports/in/payment/save-user-card.port";
import { ChargeCardPort } from "@ports/in/payment/charge-card.port";
import { ChargeMobileMoneyPort } from "@ports/in/payment/charge-mobile-money.port";
import { GetSavedCardsPort } from "@ports/in/payment/get-saved-cards.port";
import { FindAllTransactionsByUserPort } from "@ports/in/transaction/find-all-transactions-by-user.port";
import { verifyPaystackSignature } from "../util/paystack-signature";
import { STATUS_CODES } from "@common/web/status-codes";
import { VerifyPaymentPort } from "@ports/in/payment/verify-payment.port";

const logger = createLogger('CONTROLLER', 'PAYMENT');

@injectable()
export class PaymentController {
     constructor(
        @inject("PaystackCallbackPort") private paystackCallbackPort:PaystackCallbackPort,
        @inject("PaystackWebhookPort") private paystackWebhookPort:PaystackWebhookPort,
        @inject("SaveUserCardPort") private saveUserCardPort: SaveUserCardPort,
        @inject("ChargeCardPort") private chargeCardPort: ChargeCardPort,
        @inject("ChargeMobileMoneyPort") private chargeMobileMoneyPort: ChargeMobileMoneyPort,
        @inject("GetSavedCardsPort") private getSavedCardsPort: GetSavedCardsPort,
        @inject("FindAllTransactionsByUserPort") private findAllTransactionsByUserPort: FindAllTransactionsByUserPort,
        @inject("VerifyPaymentPort") private verifyPaymentPort: VerifyPaymentPort,
    ){}

    async getPaymentHistory(ctx: any) {
        const userId = ctx.state.jwtPayload.id;

        try {
            const history = await this.findAllTransactionsByUserPort.findAllTransactionsByUser(userId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = { message: 'Payment history retrieved successfully', data: history };
        } catch (error: any) {
            logger.error('Error in getPaymentHistory controller:', error);
            ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }

    async getSavedCards(ctx: any) {
        const userId = ctx.state.jwtPayload.id;

        try {
            const cards = await this.getSavedCardsPort.getSavedCards(userId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = { message: 'Saved cards retrieved successfully', data: cards };
        } catch (error: any) {
            logger.error('Error in getSavedCards controller:', error);
            ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }

    async chargeCard(ctx: any) {
        const { cardDetails, amount, email, courseId } = ctx.request.body;
        const userId = ctx.state.jwtPayload.id;
        const customerEmail = email;

        if (!cardDetails || !amount || !courseId) {
            ctx.status = STATUS_CODES.BAD_REQUEST;
            ctx.body = { message: 'Card details, amount, and courseId are required' };
            return;
        }

        try {
            const response = await this.chargeCardPort.chargeCard(userId, customerEmail, cardDetails, amount, courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = { message: 'Charge processed', data: response };
        } catch (error: any) {
            logger.error('Error in chargeCard controller:', error);
            ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }

    async chargeMobileMoney(ctx: any) {
        const { mobileMoney, amount, email, courseId } = ctx.request.body;
        const userId = ctx.state.jwtPayload.id;
        const customerEmail = email;

        if (!mobileMoney || !amount || !courseId) {
            ctx.status = STATUS_CODES.BAD_REQUEST;
            ctx.body = { message: 'Mobile money details, amount, and courseId are required' };
            return;
        }

        try {
            const response = await this.chargeMobileMoneyPort.chargeMobileMoney(userId, customerEmail, mobileMoney, amount, courseId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = { message: 'Mobile money charge processed', data: response };
        } catch (error: any) {
            logger.error('Error in chargeMobileMoney controller:', error);
            ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }

    async saveCard(ctx: any) {
        const { reference } = ctx.request.body;
        const userId = ctx.state.user.id;

        if (!reference) {
            ctx.status = 400;
            ctx.body = { message: 'No payment reference provided' };
            return;
        }

        try {
            const card = await this.saveUserCardPort.saveUserCard(userId, reference);
            ctx.status = 201;
            ctx.body = { message: 'Card saved successfully', data: card };
        } catch (error: any) {
            logger.error('Error saving user card:', error);
            ctx.status = 500;
            ctx.body = { message: error.message || MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }

    async handleCallback(ctx:any){
        const { reference } = ctx.query;

        if (!reference) {
          ctx.status = 400;
          ctx.body = { message: 'No reference provided' };
          return;
        }
      
        try {
          await this.paystackCallbackPort.handleCallback(reference);
          ctx.status = 200;
          ctx.body = { message: 'Payment processed successfully' };
        } catch (error) {
          console.error('Error processing Paystack callback:', error);
          ctx.status = 500;
          ctx.body = { message: MESSAGES.GENERIC_ERROR_HANDLER};
        }
    }


    async handleWebhook(ctx:any){
        const event = ctx.request.body;
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY as string;
        const signature = ctx.headers['x-paystack-signature'];

        if (!verifyPaystackSignature(ctx.request.rawBody, signature, paystackSecret)) {
            ctx.status = 400;
            ctx.body = { message: 'Invalid signature' };
            return;
          }

        try {
          await this.paystackWebhookPort.handleWebhook(event);
          ctx.status = 200;
          ctx.body = { message: 'Webhook processed successfully' };
        } catch (error) {
          console.error('Error processing Paystack webhook:', error);
          ctx.status = 500;
          ctx.body = { message: MESSAGES.GENERIC_ERROR_HANDLER};
        }
    }
    async verifyPayment(ctx:any){
         const { reference } = ctx.params;
        try{
            const payment = await this.verifyPaymentPort.verifyPayment(reference);
            console.log("verification response: ",payment)
            ctx.status = STATUS_CODES.OK;
            ctx.body = payment;
        }catch(error:any){
            logger.error('Error in verifyPayment contro§ller:', error);
            ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
            ctx.body = { message: error.message || MESSAGES.GENERIC_ERROR_HANDLER };
        }
    }

}