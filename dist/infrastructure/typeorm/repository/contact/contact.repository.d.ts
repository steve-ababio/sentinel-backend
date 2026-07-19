import { ContactEntity } from "@domain/models/entities/contact.entity";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
import { IdentifierType } from "@common/auth/enum";
import { BaseResponse } from "@common/global/types";
export declare class ContactRepository implements ContactPersistencePort {
    private toPersistence;
    private toDomain;
    save(contactEntity: ContactEntity): Promise<void>;
    update(contact: ContactEntity): Promise<BaseResponse>;
    findPreferredContact(userId: string, identifierType: IdentifierType): Promise<ContactEntity | null>;
    findAllUserContacts(userId: string): Promise<ContactEntity[] | null>;
    findContactByIdentifier(identifier: string, identifierType: IdentifierType): Promise<ContactEntity | null>;
}
