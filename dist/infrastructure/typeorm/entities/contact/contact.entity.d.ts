import { IdentifierType, ContactStatus } from "@common/user/enum";
import { User } from "../user/user.entity";
import { BaseEntity } from '../base/base.entity';
export declare class Contact extends BaseEntity {
    user: User;
    identifier: string;
    identifierType: IdentifierType;
    status: ContactStatus;
}
