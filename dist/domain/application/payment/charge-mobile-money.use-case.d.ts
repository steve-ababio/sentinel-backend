import { ChargeMobileMoneyPort } from "@ports/in/payment/charge-mobile-money.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
export declare class ChargeMobileMoneyUseCase implements ChargeMobileMoneyPort {
    private paystackPaymentPort;
    private userPersistencePort;
    constructor(paystackPaymentPort: PaystackPaymentPort, userPersistencePort: UserPersistencePort);
    chargeMobileMoney(userId: string, mobileMoney: any, amount: number, courseId: string): Promise<any>;
}
