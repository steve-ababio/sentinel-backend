import { IdentifierType } from "@common/auth/enum";
import { ContactStatus } from "@common/user/enum";
export declare class ContactEntity {
    userId: string;
    identifier: string;
    identifierType: IdentifierType;
    status: ContactStatus;
    is?: string | undefined;
    constructor(userId: string, identifier: string, identifierType: IdentifierType, status: ContactStatus, is?: string | undefined);
}
