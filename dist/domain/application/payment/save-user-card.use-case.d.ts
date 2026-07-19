import { SaveUserCardPort } from "@ports/in/payment/save-user-card.port";
import { UserCardPersistencePort } from "@ports/out/persistence/user-card.persistence";
import { PaystackPaymentPort } from "@ports/out/payment/paystack.payment";
import { UserCardEntity } from "@domain/models/entities/user-card.entity";
export declare class SaveUserCardUseCase implements SaveUserCardPort {
    private userCardPersistencePort;
    private paystackPaymentPort;
    constructor(userCardPersistencePort: UserCardPersistencePort, paystackPaymentPort: PaystackPaymentPort);
    saveUserCard(userId: string, reference: string): Promise<UserCardEntity>;
}
