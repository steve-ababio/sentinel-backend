import { UserEntity } from "@domain/models/entities/user.entity";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { AccountAuthStatus } from "@common/auth/enum";
import { BaseResponse } from "@common/global/types";
export declare class UserRepository implements UserPersistencePort {
    private toPersistence;
    private toDomain;
    findByEmail(email: string): Promise<UserEntity | null>;
    findBySocialChannelId(socialChannelId: string): Promise<UserEntity | null>;
    createUser(user: UserEntity): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity | null>;
    updateAccountAuthStatus(userId: string, newStatus: AccountAuthStatus): Promise<BaseResponse>;
    updatePassword(userId: string, hashedPassword: string): Promise<BaseResponse>;
}
