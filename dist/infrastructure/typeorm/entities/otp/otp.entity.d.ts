import { User } from "../user/user.entity";
import { IdentifierType, OtpStatus } from "@common/auth/enum";
import { BaseEntity } from "../base/base.entity";
export declare class Otp extends BaseEntity {
    user: User;
    identifier: string;
    identifierType: IdentifierType;
    status: OtpStatus;
    expiresAt: Date;
    code: string;
    attempts: number;
}
