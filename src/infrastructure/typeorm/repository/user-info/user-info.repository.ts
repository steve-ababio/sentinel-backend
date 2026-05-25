import { injectable } from 'tsyringe';
import { UserInfoEntity } from '@domain/models/entities/user-info.entity';
import { UserInfo } from '@infrastructure/typeorm/entities/user-info/user-info.entity';
import { manager } from "@infrastructure/typeorm/data-source";
import { User } from '@infrastructure/typeorm/entities/user/user.entity';
import {BaseResponse} from "@common/global/types";
import { UserInfoPersistencePort } from '@ports/out/persistence/user-info.persistence';

@injectable()
export class UserInfoRepository implements UserInfoPersistencePort {
    constructor() { }
    private toPersistence(userInfo: UserInfoEntity, user?: User): UserInfo {
        const userInfoModel = new UserInfo();
        userInfoModel.user = user as User;
        if (userInfo.firstName !== undefined) userInfoModel.firstName = userInfo.firstName;
        if (userInfo.lastName !== undefined) userInfoModel.lastName = userInfo.lastName;
        if (userInfo.phoneNumber !== undefined) userInfoModel.phoneNumber = userInfo.phoneNumber;
        if (userInfo.company !== undefined) userInfoModel.company = userInfo.company;
        if (userInfo.profilePicture !== undefined) userInfoModel.profilePicture = userInfo.profilePicture;
        return userInfoModel;
    }

    private toDomain(userInfo: UserInfo): UserInfoEntity {
        return new UserInfoEntity(
            userInfo.user.id, //user Id
            userInfo.firstName,
            userInfo.lastName,
            userInfo.phoneNumber as string,
            userInfo.company as string,
            userInfo.profilePicture as string,
            userInfo.id as string,
        );
    }

    async create(userInfo: UserInfoEntity): Promise<UserInfoEntity> {
        const user = new User();
        user.id = userInfo.userId as string;
        const userInfoEntity = await manager.save(UserInfo, this.toPersistence(userInfo, user as User));
        return this.toDomain(userInfoEntity);
    }

    async findById(userId: string): Promise<UserInfoEntity | null> {
        const userInfo = await  manager.findOne(UserInfo, {where: { user: { id: userId } },relations: ['user']})
        if (!userInfo ) return null;
        return this.toDomain(userInfo);
    }
    async findByUserId(userId: string): Promise<UserInfoEntity | null> {
        const userInfo = await  manager.findOne(UserInfo, {where: { user: {id:userId } },relations: ['user']})
        if (!userInfo ) return null;
        return this.toDomain(userInfo);
    }

    async update(userInfo: Partial<UserInfoEntity>): Promise<BaseResponse> {
        const user = new User();
        user.id = userInfo.userId as string;

        const updateResult = await manager.update(UserInfo, { user: { id: userInfo.userId } }, this.toPersistence(userInfo as UserInfoEntity, user as User));
        const affected = updateResult.affected as number;

        if (affected > 0) {
            return { success: true };
        } else {
            return { success: false };
        }
    }

}
