"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactEntity = void 0;
class ContactEntity {
    constructor(userId, identifier, identifierType, status, is) {
        this.userId = userId;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.status = status;
        this.is = is;
    }
}
exports.ContactEntity = ContactEntity;
