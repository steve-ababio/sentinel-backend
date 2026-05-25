import { ContactRepository } from "@infrastructure/typeorm/repository/contact/contact.repository";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
import { container } from "tsyringe";

container.register<ContactPersistencePort>("ContactPersistencePort", {
    useClass: ContactRepository
});