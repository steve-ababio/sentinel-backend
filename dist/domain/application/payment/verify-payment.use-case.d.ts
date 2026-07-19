import { VerifyPaymentPort } from "@ports/in/payment/verify-payment.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
export declare class VerifyPaymentUseCase implements VerifyPaymentPort {
    private paystackPaymentPort;
    constructor(paystackPaymentPort: PaystackPaymentPort);
    verifyPayment(reference: string): Promise<any>;
}
