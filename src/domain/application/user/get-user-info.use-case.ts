import {UserInfoEntity} from "@domain/models/entities/user-info.entity";
import {inject, injectable} from "tsyringe";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
import { GetUserInfoPort } from "@ports/in/user/get-user-info.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";

@injectable()
export class GetUserInfoUseCase implements GetUserInfoPort {
    constructor(
        @inject('UserInfoPersistencePort') 
        private readonly userInfoPersistencePort: UserInfoPersistencePort,

         @inject('UserPersistencePort') 
        private readonly userPersistencePort: UserPersistencePort
    ){}

    async getUserInfo(userId:string): Promise<UserInfoEntity|null> {
        const userInfo = await this.userInfoPersistencePort.findByUserId(userId);
        const user = await this.userPersistencePort.findById(userId);
        return new UserInfoEntity(
            userId,
            userInfo?.firstName,
            userInfo?.lastName,
            userInfo?.company,
            userInfo?.phoneNumber,
            userInfo?.profilePicture,
            userInfo?.id,
            user?.email
        )
    }
}