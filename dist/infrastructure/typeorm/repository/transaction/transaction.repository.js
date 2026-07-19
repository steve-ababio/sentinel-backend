"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const transaction_entity_1 = require("@domain/models/entities/transaction.entity");
const data_source_1 = require("@infrastructure/typeorm/data-source");
const transaction_entity_2 = require("@infrastructure/typeorm/entities/transaction/transaction.entity");
const user_entity_1 = require("@infrastructure/typeorm/entities/user/user.entity");
const course_entity_1 = require("@infrastructure/typeorm/entities/course/course.entity");
const enrollment_entity_1 = require("@infrastructure/typeorm/entities/enrollment/enrollment.entity");
const types_1 = require("@common/global/types");
const tsyringe_1 = require("tsyringe");
let TransactionRepository = class TransactionRepository {
    toPersistence(transactionEntity) {
        const transactionModel = new transaction_entity_2.Transaction();
        if (transactionEntity.id)
            transactionModel.id = transactionEntity.id;
        transactionModel.amount = transactionEntity.amount;
        transactionModel.currency = transactionEntity.currency;
        transactionModel.paymentMode = transactionEntity.paymentMode;
        transactionModel.provider = transactionEntity.provider;
        transactionModel.providerRef = transactionEntity.providerRef;
        transactionModel.status = transactionEntity.status;
        transactionModel.transactionType = transactionEntity.transactionType;
        transactionModel.cardBrand = transactionEntity.cardBrand ?? null;
        transactionModel.cardLast4 = transactionEntity.cardLast4 ?? null;
        if (transactionEntity.userId) {
            const user = new user_entity_1.User();
            user.id = transactionEntity.userId;
            transactionModel.user = user;
        }
        if (transactionEntity.courseId) {
            const course = new course_entity_1.Course();
            course.id = transactionEntity.courseId;
            transactionModel.course = course;
        }
        return transactionModel;
    }
    toDomain(transactionModel) {
        const courseTitle = transactionModel.course?.title ||
            (transactionModel.transactionType === types_1.TransactionType.SUBSCRIPTION ? "Sentinel Subscription" : "Course Purchase");
        return new transaction_entity_1.TransactionEntity(transactionModel.amount, transactionModel.currency, transactionModel.paymentMode, transactionModel.provider ?? "", transactionModel.providerRef ?? "", transactionModel.status, transactionModel.transactionType, transactionModel.id, transactionModel.user?.id, transactionModel.createdAt, transactionModel.course?.id, transactionModel.cardBrand ?? undefined, transactionModel.cardLast4 ?? undefined, courseTitle);
    }
    async create(transactionEntity) {
        const savedTransaction = await data_source_1.manager.save(transaction_entity_2.Transaction, this.toPersistence(transactionEntity));
        const reloaded = await data_source_1.manager.findOne(transaction_entity_2.Transaction, {
            where: { id: savedTransaction.id },
            relations: ["course", "user"]
        });
        return this.toDomain(reloaded ?? savedTransaction);
    }
    async fallbackCourseTitles(userId, transactions) {
        const txsWithoutCourse = transactions.filter(t => !t.course);
        if (txsWithoutCourse.length === 0)
            return;
        const enrollments = await data_source_1.manager.find(enrollment_entity_1.Enrollment, {
            where: { user: { id: userId } },
            relations: ["course"],
            order: { createdAt: "DESC" }
        });
        if (enrollments.length === 0)
            return;
        for (const t of txsWithoutCourse) {
            const tTime = t.createdAt instanceof Date ? t.createdAt.getTime() : new Date(t.createdAt).getTime();
            let bestEnrollment = enrollments[0];
            const firstE = enrollments[0];
            const firstETime = firstE.createdAt instanceof Date ? firstE.createdAt.getTime() : new Date(firstE.createdAt).getTime();
            let minDiff = Math.abs(firstETime - tTime);
            for (let i = 1; i < enrollments.length; i++) {
                const e = enrollments[i];
                const eTime = e.createdAt instanceof Date ? e.createdAt.getTime() : new Date(e.createdAt).getTime();
                const diff = Math.abs(eTime - tTime);
                if (diff < minDiff) {
                    minDiff = diff;
                    bestEnrollment = e;
                }
            }
            if (bestEnrollment && bestEnrollment.course) {
                t.course = bestEnrollment.course;
            }
        }
    }
    async findById(transactionId) {
        const transactionModel = await data_source_1.manager.findOne(transaction_entity_2.Transaction, {
            where: { id: transactionId },
            relations: ["course", "user"]
        });
        if (!transactionModel)
            return null;
        if (!transactionModel.course && transactionModel.user?.id) {
            await this.fallbackCourseTitles(transactionModel.user.id, [transactionModel]);
        }
        return this.toDomain(transactionModel);
    }
    async update(transaction) {
        const updateResult = await data_source_1.manager.update(transaction_entity_2.Transaction, { id: transaction.id }, this.toPersistence(transaction));
        const affected = updateResult.affected;
        return affected > 0;
    }
    async findAllByUserId(userId) {
        const transactions = await data_source_1.manager.find(transaction_entity_2.Transaction, {
            where: { user: { id: userId } },
            relations: ["course"],
            order: { createdAt: "DESC" }
        });
        await this.fallbackCourseTitles(userId, transactions);
        return transactions.map(t => this.toDomain(t));
    }
};
exports.TransactionRepository = TransactionRepository;
exports.TransactionRepository = TransactionRepository = __decorate([
    (0, tsyringe_1.injectable)()
], TransactionRepository);
