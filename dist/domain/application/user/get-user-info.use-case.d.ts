import { UserInfoEntity } from "@domain/models/entities/user-info.entity";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
import { GetUserInfoPort } from "@ports/in/user/get-user-info.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
export declare class GetUserInfoUseCase implements GetUserInfoPort {
    private readonly userInfoPersistencePort;
    private readonly userPersistencePort;
    private readonly contactPersistencePort;
    constructor(userInfoPersistencePort: UserInfoPersistencePort, userPersistencePort: UserPersistencePort, contactPersistencePort: ContactPersistencePort);
    getUserInfo(userId: string): Promise<UserInfoEntity | null>;
}
