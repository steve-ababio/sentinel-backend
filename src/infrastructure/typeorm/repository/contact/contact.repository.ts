import { ContactEntity } from "@domain/models/entities/contact.entity";
import { Contact } from "@infrastructure/typeorm/entities/contact/contact.entity";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
import { injectable } from "tsyringe";
import { manager } from "@infrastructure/typeorm/data-source";
import { IdentifierType } from "@common/auth/enum";
import { BaseResponse } from "@common/global/types";

@injectable()
export class ContactRepository implements ContactPersistencePort {


    private toPersistence(contactEntity: ContactEntity, user?: User): Contact {
        const contactModel = new Contact();
        contactModel.user = user as User;
        contactModel.identifier = contactEntity.identifier;
        contactModel.identifierType = contactEntity.identifierType;
        contactModel.status = contactEntity.status;
        // if(contactEntity.preferred !== undefined || contactEntity.preferred !== null) 
        //     contactModel.preferred = contactEntity.preferred as boolean;
        return contactModel;
    }

    // Convert TypeORM entity to DTO-style domain entity
    private toDomain(contact: Contact): ContactEntity {
        return new ContactEntity(
            contact.user.id,
            contact.identifier,
            contact.identifierType,
            contact.status,
            contact.id
        );
    }


    async save(contactEntity: ContactEntity): Promise<void> {
        const existing = await manager.findOne(Contact, {
            where: { identifier: contactEntity.identifier, identifierType: contactEntity.identifierType }
        });
        if (existing) {
            existing.status = contactEntity.status;
            await manager.save(Contact, existing);
        } else {
            const user = await manager.findOne(User, { where: { id: contactEntity.userId as string } });
            const contactModel = this.toPersistence(contactEntity, user as User);
            await manager.save(Contact, contactModel);
        }
    }
    async update(contact: ContactEntity): Promise<BaseResponse> {
        try {
            const user = await manager.findOne(User, { where: { id: contact.userId as string } });
            const result = await manager.update(Contact,{user:{id:contact.userId},identifierType:contact.identifierType}, this.toPersistence(contact, user as User));
            if(result.affected as number === 0){
                return {success:false}
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: "Failed to update contact" };
        }
    }
    async findPreferredContact(userId: string, identifierType: IdentifierType): Promise<ContactEntity | null> {
        const contactModel =  await manager.findOne(Contact, {
            where: {
                user: { id: userId },
                identifierType,
            },
            relations: ['user'],
        });
        if(!contactModel){
            return null
        }
        return this.toDomain(contactModel as Contact)
    }
    async findAllUserContacts(userId: string): Promise<ContactEntity[] | null>{
        const contacts = await manager.find(Contact, {
            where: {
                user: { id: userId },
            },
            relations: ['user'],
        });
        if(!contacts || contacts.length === 0){
            return null;
        }
        return contacts.map(contact => this.toDomain(contact as Contact))
    }


    async findContactByIdentifier(identifier: string, identifierType: IdentifierType): Promise<ContactEntity | null> {
        const contactModel = await manager.findOne(Contact, {
            where: {
                identifier,
                identifierType
            },
            relations: ['user'],
        });
        if (!contactModel) {
            return null;
        }
        return this.toDomain(contactModel as Contact);
    }

}