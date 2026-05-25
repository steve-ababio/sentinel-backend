import { PaystackCallbackPort } from "@ports/in/payment/paystack-callback.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { inject, injectable } from "tsyringe";



@injectable()
export class PaystackCallbackUseCase implements PaystackCallbackPort {
  constructor(
    @inject("PaystackPaymentPort") private paymentAdapter: PaystackPaymentPort
  ) {}

  async handleCallback(reference: string): Promise<void> {
    const paymentVerification = await this.paymentAdapter.verifyPayment(reference);

    if (paymentVerification.success) {

    } else {
      throw new Error('Payment verification failed');
    }
  }
}