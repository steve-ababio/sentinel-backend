import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Transaction } from "@infrastructure/typeorm/entities/transaction/transaction.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { Course } from "@infrastructure/typeorm/entities/course/course.entity";
import { Enrollment } from "@infrastructure/typeorm/entities/enrollment/enrollment.entity";
import { TransactionType } from "@common/global/types";
import { injectable } from "tsyringe";

@injectable()
export class TransactionRepository implements TransactionPersistencePort {

    private toPersistence(transactionEntity: TransactionEntity): Transaction {
        const transactionModel = new Transaction();
        if (transactionEntity.id) transactionModel.id = transactionEntity.id;
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
            const user = new User();
            user.id = transactionEntity.userId;
            transactionModel.user = user;
        }

        if (transactionEntity.courseId) {
            const course = new Course();
            course.id = transactionEntity.courseId;
            transactionModel.course = course;
        }

        return transactionModel;
    }

    private toDomain(transactionModel: Transaction): TransactionEntity {
        const courseTitle = transactionModel.course?.title || 
            (transactionModel.transactionType === TransactionType.SUBSCRIPTION ? "Sentinel Subscription" : "Course Purchase");

        return new TransactionEntity(
            transactionModel.amount,
            transactionModel.currency,
            transactionModel.paymentMode,
            transactionModel.provider ?? "",
            transactionModel.providerRef ?? "",
            transactionModel.status,
            transactionModel.transactionType,
            transactionModel.id,
            transactionModel.user?.id,
            transactionModel.createdAt,
            transactionModel.course?.id,
            transactionModel.cardBrand ?? undefined,
            transactionModel.cardLast4 ?? undefined,
            courseTitle
        );
    }

    async create(transactionEntity: TransactionEntity): Promise<TransactionEntity> {
        const savedTransaction = await manager.save(Transaction, this.toPersistence(transactionEntity));
        // Retrieve the saved transaction with relations (especially course) to return proper course title
        const reloaded = await manager.findOne(Transaction, {
            where: { id: savedTransaction.id },
            relations: ["course", "user"]
        });
        return this.toDomain(reloaded ?? savedTransaction);
    }

    private async fallbackCourseTitles(userId: string, transactions: Transaction[]): Promise<void> {
        const txsWithoutCourse = transactions.filter(t => !t.course);
        if (txsWithoutCourse.length === 0) return;

        // Fetch user enrollments
        const enrollments = await manager.find(Enrollment, {
            where: { user: { id: userId } },
            relations: ["course"],
            order: { createdAt: "DESC" }
        });

        if (enrollments.length === 0) return;

        for (const t of txsWithoutCourse) {
            const tTime = t.createdAt instanceof Date ? t.createdAt.getTime() : new Date(t.createdAt).getTime();
            
            // Find enrollment with minimum absolute time difference
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

    async findById(transactionId: string): Promise<TransactionEntity | null> {
        const transactionModel = await manager.findOne(Transaction, {
            where: { id: transactionId },
            relations: ["course", "user"]
        });
        if (!transactionModel) return null;
        if (!transactionModel.course && transactionModel.user?.id) {
            await this.fallbackCourseTitles(transactionModel.user.id, [transactionModel]);
        }
        return this.toDomain(transactionModel);
    }

    async update(transaction: TransactionEntity): Promise<boolean> {
        const updateResult = await manager.update(
            Transaction,
            { id: transaction.id },
            this.toPersistence(transaction)
        );
        const affected = updateResult.affected as number;
        return affected > 0;
    }

    async findAllByUserId(userId: string): Promise<TransactionEntity[]> {
        const transactions = await manager.find(Transaction, {
            where: { user: { id: userId } },
            relations: ["course"],
            order: { createdAt: "DESC" }
        });
        await this.fallbackCourseTitles(userId, transactions);
        return transactions.map(t => this.toDomain(t));
    }
}
