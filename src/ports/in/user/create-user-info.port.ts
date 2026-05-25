import { UserInfoEntity } from "@domain/models/entities/user-info.entity";

export interface CreateUserInfoPort {
    createUserInfo(userInfo: Partial<UserInfoEntity>): Promise<UserInfoEntity>;
}