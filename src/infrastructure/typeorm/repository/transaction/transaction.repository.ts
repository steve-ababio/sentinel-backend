import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Transaction } from "@infrastructure/typeorm/entities/transaction/transaction.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
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

        if (transactionEntity.userId) {
            const user = new User();
            user.id = transactionEntity.userId;
            transactionModel.user = user;
        }

        return transactionModel;
    }

    private toDomain(transactionModel: Transaction): TransactionEntity {
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
            transactionModel.createdAt
        );
    }

    async create(transactionEntity: TransactionEntity): Promise<TransactionEntity> {
        const savedTransaction = await manager.save(Transaction, this.toPersistence(transactionEntity));
        return this.toDomain(savedTransaction);
    }

    async findById(transactionId: string): Promise<TransactionEntity | null> {
        const transactionModel = await manager.findOne(Transaction, {
            where: { id: transactionId },
        });
        if (!transactionModel) return null;
        return this.toDomain(transactionModel);
    }

        async update(transaction: TransactionEntity): Promise<boolean> {
        const updateResult = await manager.update(
            Transaction,
            {id: transaction.id},
            this.toPersistence(transaction)
        );
        const affected = updateResult.affected as number;
        return affected > 0
    }

    async findAllByUserId(userId: string): Promise<TransactionEntity[]> {
        const transactions = await manager.find(Transaction, {
            where: { user: { id: userId } },
            order: { createdAt: "DESC" }
        });
        return transactions.map(t => this.toDomain(t));
    }
}
