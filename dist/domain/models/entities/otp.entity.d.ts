import { IdentifierType, OtpStatus } from "@common/auth/enum";
export declare class OtpEntity {
    userId: string | null;
    identifier: string;
    identifierType: IdentifierType;
    status: OtpStatus;
    expiresAt: Date;
    code: string;
    attempts: number;
    id?: string | undefined;
    constructor(userId: string | null, identifier: string, identifierType: IdentifierType, status: OtpStatus, expiresAt: Date, code: string, attempts: number, id?: string | undefined);
    static newInstance(otpCode: string, identifierType: IdentifierType, userId: string, identifier: string): OtpEntity;
    static getExpiry(duration: number): Date;
}
