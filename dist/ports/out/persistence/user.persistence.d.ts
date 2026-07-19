import { AccountAuthStatus } from "@common/auth/enum";
import { BaseResponse } from "@common/global/types";
import { UserEntity } from "@domain/models/entities/user.entity";
export interface UserPersistencePort {
    findByEmail(email: string): Promise<UserEntity | null>;
    createUser(user: UserEntity): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity | null>;
    findBySocialChannelId(socialChannelId: string): Promise<UserEntity | null>;
    updateAccountAuthStatus(id: string, authStatus: AccountAuthStatus): Promise<BaseResponse>;
    updatePassword(userId: string, hashedPassword: string): Promise<BaseResponse>;
}
