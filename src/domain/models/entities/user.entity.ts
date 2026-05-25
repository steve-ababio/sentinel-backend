import { SocialChannel } from "@common/auth/enum";

export class UserEntity {
    constructor(
        public id: string | null,
        public email: string,
        public password: string | null,
        public socialChannel: SocialChannel,
        public socialChannelId: string | null,
        public promptPasswordChange?: boolean | null,
    ) {}

}