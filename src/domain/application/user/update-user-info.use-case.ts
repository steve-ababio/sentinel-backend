import {UserInfoEntity} from "@domain/models/entities/user-info.entity";
import {UpdateUserInfoPort} from "@ports/in/user/update-user-info.port";
import {inject, injectable} from "tsyringe";
import {BaseResponse} from "@common/global/types";
import {RouteError} from "@infrastructure/web/util/route-error";
import { STATUS_CODES } from "@common/web/status-codes";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
import { USER_MESSAGES } from "@common/user/constants";

@injectable()
export class UpdateUserInfoUseCase implements UpdateUserInfoPort {
    constructor(
        @inject('UserInfoPersistencePort') 
        private readonly userInfoPersistencePort: UserInfoPersistencePort
    ){}

    async updateUserInfo(userInfo: UserInfoEntity): Promise<BaseResponse> {
        const {id} = userInfo;
        const userInfoEntity = await this.userInfoPersistencePort.findById(id!);
        if (!userInfoEntity) throw new RouteError(STATUS_CODES.NOT_FOUND, USER_MESSAGES.USER_INFO_NOT_FOUND);
        return await this.userInfoPersistencePort.update(userInfo);
    }
}