import { PaystackCallbackPort } from "@ports/in/payment/paystack-callback.port";
import { PaystackWebhookPort } from "@ports/in/payment/paystack-webhook.port";
import { SaveUserCardPort } from "@ports/in/payment/save-user-card.port";
import { ChargeCardPort } from "@ports/in/payment/charge-card.port";
import { ChargeMobileMoneyPort } from "@ports/in/payment/charge-mobile-money.port";
import { GetSavedCardsPort } from "@ports/in/payment/get-saved-cards.port";
import { FindAllTransactionsByUserPort } from "@ports/in/transaction/find-all-transactions-by-user.port";
import { VerifyPaymentPort } from "@ports/in/payment/verify-payment.port";
export declare class PaymentController {
    private paystackCallbackPort;
    private paystackWebhookPort;
    private saveUserCardPort;
    private chargeCardPort;
    private chargeMobileMoneyPort;
    private getSavedCardsPort;
    private findAllTransactionsByUserPort;
    private verifyPaymentPort;
    constructor(paystackCallbackPort: PaystackCallbackPort, paystackWebhookPort: PaystackWebhookPort, saveUserCardPort: SaveUserCardPort, chargeCardPort: ChargeCardPort, chargeMobileMoneyPort: ChargeMobileMoneyPort, getSavedCardsPort: GetSavedCardsPort, findAllTransactionsByUserPort: FindAllTransactionsByUserPort, verifyPaymentPort: VerifyPaymentPort);
    getPaymentHistory(ctx: any): Promise<void>;
    getSavedCards(ctx: any): Promise<void>;
    chargeCard(ctx: any): Promise<void>;
    chargeMobileMoney(ctx: any): Promise<void>;
    saveCard(ctx: any): Promise<void>;
    handleCallback(ctx: any): Promise<void>;
    handleWebhook(ctx: any): Promise<void>;
    verifyPayment(ctx: any): Promise<void>;
}
