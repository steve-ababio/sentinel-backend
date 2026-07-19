import { PaystackWebhookPort } from "@ports/in/payment/paystack-webhook.port";
import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { CreateTransactionPort } from "@ports/in/transaction/create-transaction.port";
export declare class PaystackWebhookUseCase implements PaystackWebhookPort {
    private createEnrollmentPort;
    private createTransactionPort;
    constructor(createEnrollmentPort: CreateEnrollmentPort, createTransactionPort: CreateTransactionPort);
    handleWebhook(event: any): Promise<void>;
}
