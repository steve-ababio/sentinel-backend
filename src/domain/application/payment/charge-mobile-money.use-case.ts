import { inject, autoInjectable } from "tsyringe";
import { ChargeMobileMoneyPort } from "@ports/in/payment/charge-mobile-money.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { logger } from "@infrastructure/web/util/logger";

@autoInjectable()
export class ChargeMobileMoneyUseCase implements ChargeMobileMoneyPort {
    constructor(
        @inject("PaystackPaymentPort")
        private paystackPaymentPort: PaystackPaymentPort
    ) {}

    async chargeMobileMoney(userId: string, email: string, mobileMoney: any, amount: number, courseId: string): Promise<any> {
        try {
            const metadata = { userId, courseId };
            const response = await this.paystackPaymentPort.chargeMobileMoney(mobileMoney, email, amount, metadata);
            
            // For mobile money, Paystack usually returns a 'pay_offline' or 'send_otp' status
            // which requires the user to approve on their phone.
            // We just return the response to let the frontend handle the next steps.
            return response;
        } catch (error: any) {
            logger.error(`Error in ChargeMobileMoneyUseCase for user ${userId}:`, error);
            throw new Error(`Charge failed: ${error.message}`);
        }
    }
}
