import { ChargeCardPort } from "@ports/in/payment/charge-card.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
export declare class ChargeCardUseCase implements ChargeCardPort {
    private paystackPaymentPort;
    private userCardPersistencePort;
    constructor(paystackPaymentPort: PaystackPaymentPort, userCardPersistencePort: UserCardPersistencePort);
    chargeCard(userId: string, email: string, cardDetails: any, amount: number, courseId: string): Promise<any>;
}
