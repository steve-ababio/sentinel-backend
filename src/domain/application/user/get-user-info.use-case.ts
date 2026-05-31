import {UserInfoEntity} from "@domain/models/entities/user-info.entity";
import {inject, injectable} from "tsyringe";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
import { GetUserInfoPort } from "@ports/in/user/get-user-info.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
import { IdentifierType } from "@common/auth/enum";
import { ContactStatus } from "@common/user/enum";

@injectable()
export class GetUserInfoUseCase implements GetUserInfoPort {
    constructor(
        @inject('UserInfoPersistencePort') 
        private readonly userInfoPersistencePort: UserInfoPersistencePort,
        @inject('UserPersistencePort') 
        private readonly userPersistencePort: UserPersistencePort,
        @inject('ContactPersistencePort')
        private readonly contactPersistencePort: ContactPersistencePort,
    ){}

    async getUserInfo(userId:string): Promise<UserInfoEntity|null> {
        const userInfo = await this.userInfoPersistencePort.findByUserId(userId);
        const user = await this.userPersistencePort.findById(userId);
        
        // Fetch user contacts to check email verification status
        const contacts = await this.contactPersistencePort.findAllUserContacts(userId);
        const emailContact = contacts?.find(c => c.identifierType === IdentifierType.EMAIL);
        const isEmailVerified = emailContact ? emailContact.status === ContactStatus.VERIFIED : false;

        return new UserInfoEntity(
            userId,
            userInfo?.firstName,
            userInfo?.lastName,
            userInfo?.phoneNumber,
            userInfo?.company,
            userInfo?.profilePicture,
            userInfo?.id,
            user?.email,
            isEmailVerified
        )
    }
}