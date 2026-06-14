
import { inject, autoInjectable } from "tsyringe";
import { VerifyPaymentPort } from "@ports/in/payment/verify-payment.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";

@autoInjectable()
export class VerifyPaymentUseCase implements VerifyPaymentPort {
    constructor(
        @inject("PaystackPaymentPort")
        private paystackPaymentPort: PaystackPaymentPort
    ) {}

    async verifyPayment(reference: string): Promise<any> {
        return this.paystackPaymentPort.verifyPayment(reference);
    }
}
