import { PaystackCallbackPort } from "@ports/in/payment/paystack-callback.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
export declare class PaystackCallbackUseCase implements PaystackCallbackPort {
    private paymentAdapter;
    constructor(paymentAdapter: PaystackPaymentPort);
    handleCallback(reference: string): Promise<void>;
}
