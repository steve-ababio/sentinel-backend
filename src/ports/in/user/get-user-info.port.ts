import { UserInfoEntity } from "@domain/models/entities/user-info.entity";

export interface GetUserInfoPort {
    getUserInfo(userId: string): Promise<UserInfoEntity|null>;
}