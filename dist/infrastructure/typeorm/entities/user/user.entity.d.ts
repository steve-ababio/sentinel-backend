import { BaseEntity } from '../base/base.entity';
import { AccountAuthStatus, SocialChannel } from '@common/auth/enum';
import { UserRole } from '@common/global/types';
export declare class User extends BaseEntity {
    identifier: string;
    socialChannel: SocialChannel;
    accountAuthStatus: AccountAuthStatus;
    socialChannelId: string | null;
    password: string | null;
    role: UserRole;
    passwordResetDate?: Date;
}
