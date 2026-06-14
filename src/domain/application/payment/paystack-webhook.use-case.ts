import {PaystackWebhookPort} from "@ports/in/payment/paystack-webhook.port";
import {autoInjectable, inject} from "tsyringe";
import { logger } from "@infrastructure/web/util/logger";
import { CreateEnrollmentPort } from "@ports/in/enrollment/create-enrollment.port";
import { EnrollmentEntity } from "@domain/models/entities/enrollment.entity";
import { EnrollmentStatus, TransactionStatus, TransactionType } from "@common/global/types";
import { CreateTransactionPort } from "@ports/in/transaction/create-transaction.port";
import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { PaymentMode, CurrencyCodes } from "@common/user/enum";

@autoInjectable()
export class PaystackWebhookUseCase implements PaystackWebhookPort {
    constructor(
        @inject('CreateEnrollmentPort')
        private createEnrollmentPort: CreateEnrollmentPort,
        @inject('CreateTransactionPort')
        private createTransactionPort: CreateTransactionPort
    ) {}

    async handleWebhook(event: any): Promise<void> {
        if (event.event === 'charge.success') {
            const reference = event.data.reference;
            const channel = event.data.authorization?.channel;
            const merchantName = event.data.authorization?.bank;
            const metadata = event.data.metadata;
            const amount = event.data.amount ? event.data.amount / 100 : 0;
            const currency = event.data.currency as CurrencyCodes;

            logger.info(`Payment successful for reference: ${reference}`);

            let paymentMode = PaymentMode.CARD;
            if (channel === 'mobile_money') paymentMode = PaymentMode.MOBILE_MONEY;
            else if (channel === 'bank') paymentMode = PaymentMode.BANK;

            const userId = metadata?.userId;
            const courseId = metadata?.courseId;
            const cardBrand = event.data.authorization?.brand;
            const cardLast4 = event.data.authorization?.last4;

            try {
                const transaction = new TransactionEntity(
                    amount,
                    currency,
                    paymentMode,
                    "Paystack",
                    reference,
                    TransactionStatus.SUCCESS,
                    TransactionType.PAYMENT,
                    undefined,
                    userId,
                    undefined,
                    courseId,
                    cardBrand,
                    cardLast4
                );
                await this.createTransactionPort.createTransaction(transaction);
                logger.info(`Recorded successful transaction for reference: ${reference}`);
            } catch (error) {
                logger.error(`Failed to record transaction for reference: ${reference}`, error);
            }

            // Automatically enroll the user if courseId and userId are provided in metadata
            if (metadata && metadata.userId && metadata.courseId) {
                try {
                    const enrollment = new EnrollmentEntity(
                        EnrollmentStatus.ACTIVE,
                        metadata.userId,
                        metadata.courseId
                    );
                    await this.createEnrollmentPort.createEnrollment(enrollment);
                    
                    logger.info(`Successfully enrolled user ${metadata.userId} in course ${metadata.courseId}`);
                } catch (error) {
                    logger.error(`Failed to create enrollment for user ${metadata.userId} and course ${metadata.courseId}`, error);
                }
            } else {
                logger.warn(`No userId or courseId found in metadata for reference ${reference}. Skipping enrollment.`);
            }

        } else if (event.event === 'charge.failed') {
            const reference = event.data.reference;
            logger.error('charge failed for reference', reference);
        } else {
            logger.error('Unhandled event type:', event.event);
        }
    }
}