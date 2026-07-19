import { User } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';
export declare class UserInfo extends BaseEntity {
    user: User;
    firstName: string;
    lastName: string;
    company: string;
    phoneNumber: string;
    profilePicture: string | null;
}
