import { IdentifierType } from "@common/auth/enum";
import { OtpEntity } from "@domain/models/entities/otp.entity";
export interface OtpPersistencePort {
    save(payload: OtpEntity): Promise<void>;
    invalidateActiveOtps(userId: string, identifierType: IdentifierType): Promise<void>;
    findActiveOtpByIdentifier(identifier: string, identifierType: IdentifierType): Promise<OtpEntity | null>;
    update(id: string, payload: Partial<OtpEntity>): Promise<void>;
}
