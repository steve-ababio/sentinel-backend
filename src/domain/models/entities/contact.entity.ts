import { IdentifierType } from "@common/auth/enum";
import { ContactStatus } from "@common/user/enum";

export class ContactEntity {
    constructor(
        public userId: string,
        public identifier: string,
        public identifierType: IdentifierType,
        public status: ContactStatus,
        // public preferred?: boolean,
        public is?: string,

    ) {}

}