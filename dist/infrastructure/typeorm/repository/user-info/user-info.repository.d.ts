import { UserInfoEntity } from '@domain/models/entities/user-info.entity';
import { BaseResponse } from "@common/global/types";
import { UserInfoPersistencePort } from '@ports/out/persistence/user-info.persistence';
export declare class UserInfoRepository implements UserInfoPersistencePort {
    constructor();
    private toPersistence;
    private toDomain;
    create(userInfo: UserInfoEntity): Promise<UserInfoEntity>;
    findById(userId: string): Promise<UserInfoEntity | null>;
    findByUserId(userId: string): Promise<UserInfoEntity | null>;
    update(userInfo: Partial<UserInfoEntity>): Promise<BaseResponse>;
}
