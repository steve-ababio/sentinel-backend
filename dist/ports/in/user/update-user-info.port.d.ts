import { UserInfoEntity } from "@domain/models/entities/user-info.entity";
import { BaseResponse } from "@common/global/types";
export interface UpdateUserInfoPort {
    updateUserInfo(userInfo: UserInfoEntity): Promise<BaseResponse>;
}
