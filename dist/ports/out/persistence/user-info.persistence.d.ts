import { BaseResponse } from "@common/global/types";
import { UserInfoEntity } from "@domain/models/entities/user-info.entity";
export interface UserInfoPersistencePort {
    create(userInfo: UserInfoEntity): Promise<UserInfoEntity>;
    findById(userId: string): Promise<UserInfoEntity | null>;
    findByUserId(userId: string): Promise<UserInfoEntity | null>;
    update(userInfo: Partial<UserInfoEntity>): Promise<BaseResponse>;
}
