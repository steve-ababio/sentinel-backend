import { IdentifierType } from "@common/auth/enum";
import { BaseResponse } from "@common/global/types";
import { ContactEntity } from "@domain/models/entities/contact.entity";
export interface ContactPersistencePort {
    save(payload: ContactEntity): Promise<void>;
    update(contact: ContactEntity): Promise<BaseResponse>;
    findPreferredContact(userId: string, identifierType: IdentifierType): Promise<ContactEntity | null>;
    findAllUserContacts(userId: string): Promise<ContactEntity[] | null>;
    findContactByIdentifier(identifier: string, identifierType: IdentifierType): Promise<ContactEntity | null>;
}
