import { IdentifierType, OtpStatus } from "@common/auth/enum";
import { OtpEntity } from "@domain/models/entities/otp.entity";
import { OtpPersistencePort } from "@ports/out/persistence/otp.persistence";
import { manager } from "@infrastructure/typeorm/data-source";
import { Otp } from "@infrastructure/typeorm/entities/otp/otp.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { injectable } from "tsyringe";

@injectable()
export class OtpRepository implements OtpPersistencePort {

    private toPersistence(domain: OtpEntity | Partial<OtpEntity>): Otp {
        const model = new Otp();
        if (domain.id) model.id = domain.id;
        if (domain.identifier) model.identifier = domain.identifier;
        if (domain.identifierType) model.identifierType = domain.identifierType;
        if (domain.status) model.status = domain.status;
        if (domain.expiresAt) model.expiresAt = domain.expiresAt;
        if (domain.code) model.code = domain.code;
        if (domain.attempts !== undefined) model.attempts = domain.attempts;

        if (domain.userId) {
            const user = new User();
            user.id = domain.userId;
            model.user = user;
        }

        return model;
    }

    private toDomain(model: Otp): OtpEntity {
        return new OtpEntity(
            model.user?.id || null,
            model.identifier,
            model.identifierType,
            model.status,
            model.expiresAt,
            model.code,
            model.attempts,
            model.id
        );
    }

    async save(payload: OtpEntity): Promise<void> {
        await manager.save(Otp, this.toPersistence(payload));
    }

    async invalidateActiveOtps(userId: string, identifierType: IdentifierType): Promise<void> {
        await manager.createQueryBuilder()
            .update(Otp)
            .set({ status: OtpStatus.EXPIRED })
            .where("user_id = :userId", { userId })
            .andWhere("identifier_type = :identifierType", { identifierType })
            .andWhere("status = :status", { status: OtpStatus.ACTIVE })
            .execute();
    }

    async findActiveOtpByIdentifier(identifier: string, identifierType: IdentifierType): Promise<OtpEntity | null> {
        const otp = await manager.findOne(Otp, {
            where: {
                identifier,
                identifierType,
                status: OtpStatus.ACTIVE
            },
            relations: ["user"]
        });

        if (!otp) return null;
        return this.toDomain(otp);
    }

    async update(id: string, payload: Partial<OtpEntity>): Promise<void> {
        const updateData: Partial<Otp> = {};
        if (payload.status) updateData.status = payload.status;
        if (payload.attempts !== undefined) updateData.attempts = payload.attempts;
        // Map other properties if necessary

        await manager.update(Otp, { id }, updateData);
    }
}
