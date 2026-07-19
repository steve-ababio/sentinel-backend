"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackWebhookUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("@infrastructure/web/util/logger");
const enrollment_entity_1 = require("@domain/models/entities/enrollment.entity");
const types_1 = require("@common/global/types");
const transaction_entity_1 = require("@domain/models/entities/transaction.entity");
const enum_1 = require("@common/user/enum");
let PaystackWebhookUseCase = class PaystackWebhookUseCase {
    constructor(createEnrollmentPort, createTransactionPort) {
        this.createEnrollmentPort = createEnrollmentPort;
        this.createTransactionPort = createTransactionPort;
    }
    async handleWebhook(event) {
        if (event.event === 'charge.success') {
            const reference = event.data.reference;
            const channel = event.data.authorization?.channel;
            const merchantName = event.data.authorization?.bank;
            const metadata = event.data.metadata;
            const amount = event.data.amount ? event.data.amount / 100 : 0;
            const currency = event.data.currency;
            logger_1.logger.info(`Payment successful for reference: ${reference}`);
            let paymentMode = enum_1.PaymentMode.CARD;
            if (channel === 'mobile_money')
                paymentMode = enum_1.PaymentMode.MOBILE_MONEY;
            else if (channel === 'bank')
                paymentMode = enum_1.PaymentMode.BANK;
            const userId = metadata?.userId;
            const courseId = metadata?.courseId;
            const cardBrand = event.data.authorization?.brand;
            const cardLast4 = event.data.authorization?.last4;
            try {
                const transaction = new transaction_entity_1.TransactionEntity(amount, currency, paymentMode, "Paystack", reference, types_1.TransactionStatus.SUCCESS, types_1.TransactionType.PAYMENT, undefined, userId, undefined, courseId, cardBrand, cardLast4);
                await this.createTransactionPort.createTransaction(transaction);
                logger_1.logger.info(`Recorded successful transaction for reference: ${reference}`);
            }
            catch (error) {
                logger_1.logger.error(`Failed to record transaction for reference: ${reference}`, error);
            }
            if (metadata && metadata.userId && metadata.courseId) {
                try {
                    const enrollment = new enrollment_entity_1.EnrollmentEntity(types_1.EnrollmentStatus.ACTIVE, metadata.userId, metadata.courseId);
                    await this.createEnrollmentPort.createEnrollment(enrollment);
                    logger_1.logger.info(`Successfully enrolled user ${metadata.userId} in course ${metadata.courseId}`);
                }
                catch (error) {
                    logger_1.logger.error(`Failed to create enrollment for user ${metadata.userId} and course ${metadata.courseId}`, error);
                }
            }
            else {
                logger_1.logger.warn(`No userId or courseId found in metadata for reference ${reference}. Skipping enrollment.`);
            }
        }
        else if (event.event === 'charge.failed') {
            const reference = event.data.reference;
            logger_1.logger.error('charge failed for reference', reference);
        }
        else {
            logger_1.logger.error('Unhandled event type:', event.event);
        }
    }
};
exports.PaystackWebhookUseCase = PaystackWebhookUseCase;
exports.PaystackWebhookUseCase = PaystackWebhookUseCase = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)('CreateEnrollmentPort')),
    __param(1, (0, tsyringe_1.inject)('CreateTransactionPort')),
    __metadata("design:paramtypes", [Object, Object])
], PaystackWebhookUseCase);
