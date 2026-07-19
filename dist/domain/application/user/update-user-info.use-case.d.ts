import { UserInfoEntity } from "@domain/models/entities/user-info.entity";
import { UpdateUserInfoPort } from "@ports/in/user/update-user-info.port";
import { BaseResponse } from "@common/global/types";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
export declare class UpdateUserInfoUseCase implements UpdateUserInfoPort {
    private readonly userInfoPersistencePort;
    constructor(userInfoPersistencePort: UserInfoPersistencePort);
    updateUserInfo(userInfo: UserInfoEntity): Promise<BaseResponse>;
}
