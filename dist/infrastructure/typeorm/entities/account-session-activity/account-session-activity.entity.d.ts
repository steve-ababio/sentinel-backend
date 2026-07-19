import { User } from "../user/user.entity";
import { AccountSessionStatus } from "@common/auth/enum";
import { BaseEntity } from "../base/base.entity";
export declare class AccountSessionActivity extends BaseEntity {
    user: User;
    deviceType: string;
    os: string;
    status: AccountSessionStatus;
}
