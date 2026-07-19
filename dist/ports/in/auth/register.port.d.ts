import { SocialChannel } from "@common/auth/enum";
import { UserEntity } from "@domain/models/entities/user.entity";
export type RegisterPortOptions = {
    email: string;
    socialChannelId: string | null;
    socialChannel: SocialChannel;
    password?: string;
};
export interface RegisterPort {
    register(regiserPortOptions: RegisterPortOptions): Promise<UserEntity>;
}
