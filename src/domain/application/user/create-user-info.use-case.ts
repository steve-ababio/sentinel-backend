import { UserInfoEntity } from "@domain/models/entities/user-info.entity";
import { CreateUserInfoPort } from "@ports/in/user/create-user-info.port";
import { UserInfoPersistencePort } from "@ports/out/persistence/user-info.persistence";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserInfoUseCase implements CreateUserInfoPort {
  constructor(
    @inject('UserInfoPersistencePort') 
    private readonly userInfoPersistencePort: UserInfoPersistencePort
  ) {}

  async createUserInfo(userInfo: Partial<UserInfoEntity>): Promise<UserInfoEntity> {
    const existingUserInfo = await this.userInfoPersistencePort.findById(userInfo.userId as string);
    if(existingUserInfo) {
      this.userInfoPersistencePort.update(userInfo as UserInfoEntity);
      const updatedUserInfo = await this.userInfoPersistencePort.findById(userInfo.userId as string);
      return updatedUserInfo as UserInfoEntity;
    }
    return this.userInfoPersistencePort.create(userInfo as UserInfoEntity);
  }
}