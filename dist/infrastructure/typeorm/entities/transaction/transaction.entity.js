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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const typeorm_2 = require("typeorm");
const types_1 = require("@common/global/types");
const enum_1 = require("@common/user/enum");
const base_entity_1 = require("../base/base.entity");
let Transaction = class Transaction extends base_entity_1.BaseEntity {
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_2.Column)({
        type: 'enum',
        enum: enum_1.UniqueCurrencies,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "currency", void 0);
__decorate([
    (0, typeorm_2.Column)({
        name: 'payment_mode',
        type: 'enum',
        enum: enum_1.PaymentMode,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Transaction.prototype, "paymentMode", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "provider", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], Transaction.prototype, "providerRef", void 0);
__decorate([
    (0, typeorm_2.Column)({
        type: 'enum',
        enum: types_1.TransactionStatus,
        default: types_1.TransactionStatus.INITIATED,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, typeorm_2.Column)({
        name: 'transaction_type',
        type: 'enum',
        enum: types_1.TransactionType,
        default: types_1.TransactionType.PAYMENT
    }),
    __metadata("design:type", String)
], Transaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_2.Column)({
        name: 'card_brand',
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Transaction.prototype, "cardBrand", void 0);
__decorate([
    (0, typeorm_2.Column)({
        name: 'card_last4',
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Transaction.prototype, "cardLast4", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Transaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", Object)
], Transaction.prototype, "course", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)('transaction')
], Transaction);
