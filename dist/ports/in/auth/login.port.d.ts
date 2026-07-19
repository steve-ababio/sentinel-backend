import { SocialChannel } from "@common/auth/enum";
import { UserEntity } from "@domain/models/entities/user.entity";
export type LoginPortOptions = {
    email: string;
    socialChannelId: string | null;
    socialChannel: SocialChannel;
    password?: string;
};
export interface LoginResponse {
    user: UserEntity;
}
export interface LoginPort {
    login(options: LoginPortOptions): Promise<LoginResponse>;
}
