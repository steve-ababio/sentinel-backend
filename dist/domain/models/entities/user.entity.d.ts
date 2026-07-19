import { SocialChannel } from "@common/auth/enum";
import { UserRole } from "@common/global/types";
export declare class UserEntity {
    id: string | null;
    email: string;
    password: string | null;
    socialChannel: SocialChannel;
    socialChannelId: string | null;
    promptPasswordChange?: boolean | null | undefined;
    role?: UserRole | undefined;
    constructor(id: string | null, email: string, password: string | null, socialChannel: SocialChannel, socialChannelId: string | null, promptPasswordChange?: boolean | null | undefined, role?: UserRole | undefined);
}
