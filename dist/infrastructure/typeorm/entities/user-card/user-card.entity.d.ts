import { User } from "../user/user.entity";
import { BaseEntity } from '../base/base.entity';
export declare class UserCard extends BaseEntity {
    user: User;
    cardToken: string;
    last4: string;
    brand: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
}
