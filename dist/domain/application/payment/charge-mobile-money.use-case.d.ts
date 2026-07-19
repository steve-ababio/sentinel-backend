import { ChargeMobileMoneyPort } from "@ports/in/payment/charge-mobile-money.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
export declare class ChargeMobileMoneyUseCase implements ChargeMobileMoneyPort {
    private paystackPaymentPort;
    constructor(paystackPaymentPort: PaystackPaymentPort);
    chargeMobileMoney(userId: string, email: string, mobileMoney: any, amount: number, courseId: string): Promise<any>;
}
