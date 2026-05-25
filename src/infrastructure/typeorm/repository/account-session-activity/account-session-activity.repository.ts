import { BaseResponse } from "@common/global/types";
import { AccountSessionStatus } from "@common/auth/enum";
import { AccountSessionActivityEntity } from "@domain/models/entities/account-session-activity.entity";
import { AccountSessionActivityPersistencePort } from "@ports/out/persistence/account-session-activity.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { AccountSessionActivity } from "@infrastructure/typeorm/entities/account-session-activity/account-session-activity.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { injectable } from "tsyringe";

@injectable()
export class AccountSessionActivityRepository implements AccountSessionActivityPersistencePort {

    private toPersistence(domain: AccountSessionActivityEntity): AccountSessionActivity {
        const model = new AccountSessionActivity();
        if (domain.id) model.id = domain.id;
        
        const user = new User();
        user.id = domain.userId;
        model.user = user;

        model.deviceType = domain.deviceType;
        model.os = domain.os;
        model.status = domain.status;
        return model;
    }

    private toDomain(model: AccountSessionActivity): AccountSessionActivityEntity {
        return new AccountSessionActivityEntity(
            model.user?.id || "",
            model.deviceType,
            model.os,
            model.status,
            model.id
        );
    }

    async cretateaccountSessionActivity(accountSessionActivity: AccountSessionActivityEntity): Promise<string> {
        const saved = await manager.save(AccountSessionActivity, this.toPersistence(accountSessionActivity));
        return saved.id;
    }

    async updateSessionActivityStatusById(sessionId: string, status: AccountSessionStatus): Promise<BaseResponse> {
        try {
            const result = await manager.update(AccountSessionActivity, { id: sessionId }, { status });
            if (result.affected === 0) return { success: false, message: "Session not found" };
            return { success: true, message: "Session status updated successfully" };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }

    async findById(id: string): Promise<AccountSessionActivityEntity | null> {
        const model = await manager.findOne(AccountSessionActivity, {
            where: { id },
            relations: ["user"]
        });
        if (!model) return null;
        return this.toDomain(model);
    }

    async invalidateActiveSessions(userId: string, currentSessionId?: string): Promise<void> {
        const query = manager.createQueryBuilder()
            .update(AccountSessionActivity)
            .set({ status: AccountSessionStatus.EXPIRED })
            .where("userId = :userId", { userId })
            .andWhere("status = :status", { status: AccountSessionStatus.ACTIVE });

        if (currentSessionId) {
            query.andWhere("id != :currentSessionId", { currentSessionId });
        }

        await query.execute();
    }
}
