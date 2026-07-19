"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_repository_1 = require("@infrastructure/typeorm/repository/contact/contact.repository");
const tsyringe_1 = require("tsyringe");
tsyringe_1.container.register("ContactPersistencePort", {
    useClass: contact_repository_1.ContactRepository
});
