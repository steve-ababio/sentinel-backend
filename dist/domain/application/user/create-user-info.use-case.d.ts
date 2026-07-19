import { UserInfoEntity } from "@domain/models/entities/user-info.entity";
import { CreateUserInfoPort } from "@ports/in/user/create-user-info.port";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
export declare class CreateUserInfoUseCase implements CreateUserInfoPort {
    private readonly userInfoPersistencePort;
    constructor(userInfoPersistencePort: UserInfoPersistencePort);
    createUserInfo(userInfo: Partial<UserInfoEntity>): Promise<UserInfoEntity>;
}
