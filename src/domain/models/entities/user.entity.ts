import { SocialChannel } from "@common/auth/enum";
import { UserRole } from "@common/global/types";

export class UserEntity {
    constructor(
        public id: string | null,
        public email: string,
        public password: string | null,
        public socialChannel: SocialChannel,
        public socialChannelId: string | null,
        public promptPasswordChange?: boolean | null,
        public role?: UserRole,
    ) {}

}