import { ChargeCardPort } from "@ports/in/payment/charge-card.port";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
export declare class ChargeCardUseCase implements ChargeCardPort {
    private paystackPaymentPort;
    private userCardPersistencePort;
    private userPersistencePort;
    constructor(paystackPaymentPort: PaystackPaymentPort, userCardPersistencePort: UserCardPersistencePort, userPersistencePort: UserPersistencePort);
    chargeCard(userId: string, cardDetails: any, amount: number, courseId: string): Promise<any>;
}
