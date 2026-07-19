"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const contact_entity_1 = require("@domain/models/entities/contact.entity");
const contact_entity_2 = require("@infrastructure/typeorm/entities/contact/contact.entity");
const user_entity_1 = require("@infrastructure/typeorm/entities/user/user.entity");
const tsyringe_1 = require("tsyringe");
const data_source_1 = require("@infrastructure/typeorm/data-source");
let ContactRepository = class ContactRepository {
    toPersistence(contactEntity, user) {
        const contactModel = new contact_entity_2.Contact();
        contactModel.user = user;
        contactModel.identifier = contactEntity.identifier;
        contactModel.identifierType = contactEntity.identifierType;
        contactModel.status = contactEntity.status;
        return contactModel;
    }
    toDomain(contact) {
        return new contact_entity_1.ContactEntity(contact.user.id, contact.identifier, contact.identifierType, contact.status, contact.id);
    }
    async save(contactEntity) {
        const existing = await data_source_1.manager.findOne(contact_entity_2.Contact, {
            where: { identifier: contactEntity.identifier, identifierType: contactEntity.identifierType }
        });
        if (existing) {
            existing.status = contactEntity.status;
            await data_source_1.manager.save(contact_entity_2.Contact, existing);
        }
        else {
            const user = await data_source_1.manager.findOne(user_entity_1.User, { where: { id: contactEntity.userId } });
            const contactModel = this.toPersistence(contactEntity, user);
            await data_source_1.manager.save(contact_entity_2.Contact, contactModel);
        }
    }
    async update(contact) {
        try {
            const user = await data_source_1.manager.findOne(user_entity_1.User, { where: { id: contact.userId } });
            const result = await data_source_1.manager.update(contact_entity_2.Contact, { user: { id: contact.userId }, identifierType: contact.identifierType }, this.toPersistence(contact, user));
            if (result.affected === 0) {
                return { success: false };
            }
            return { success: true };
        }
        catch (error) {
            return { success: false, message: "Failed to update contact" };
        }
    }
    async findPreferredContact(userId, identifierType) {
        const contactModel = await data_source_1.manager.findOne(contact_entity_2.Contact, {
            where: {
                user: { id: userId },
                identifierType,
            },
            relations: ['user'],
        });
        if (!contactModel) {
            return null;
        }
        return this.toDomain(contactModel);
    }
    async findAllUserContacts(userId) {
        const contacts = await data_source_1.manager.find(contact_entity_2.Contact, {
            where: {
                user: { id: userId },
            },
            relations: ['user'],
        });
        if (!contacts || contacts.length === 0) {
            return null;
        }
        return contacts.map(contact => this.toDomain(contact));
    }
    async findContactByIdentifier(identifier, identifierType) {
        const contactModel = await data_source_1.manager.findOne(contact_entity_2.Contact, {
            where: {
                identifier,
                identifierType
            },
            relations: ['user'],
        });
        if (!contactModel) {
            return null;
        }
        return this.toDomain(contactModel);
    }
};
exports.ContactRepository = ContactRepository;
exports.ContactRepository = ContactRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ContactRepository);
