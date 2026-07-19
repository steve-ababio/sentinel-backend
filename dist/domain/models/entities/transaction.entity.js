"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEntity = void 0;
class TransactionEntity {
    constructor(amount, currency, paymentMode, provider, providerRef, status, transactionType, id, userId, createdAt, courseId, cardBrand, cardLast4, courseTitle) {
        this.amount = amount;
        this.currency = currency;
        this.paymentMode = paymentMode;
        this.provider = provider;
        this.providerRef = providerRef;
        this.status = status;
        this.transactionType = transactionType;
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.courseId = courseId;
        this.cardBrand = cardBrand;
        this.cardLast4 = cardLast4;
        this.courseTitle = courseTitle;
    }
}
exports.TransactionEntity = TransactionEntity;
