import { UserEntity } from "@domain/models/entities/user.entity";
import { manager } from "@infrastructure/typeorm/data-source";
import { User } from "@infrastructure/typeorm/entities/user/user.entity";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { AccountAuthStatus } from "@common/auth/enum";
import { injectable } from "tsyringe";
import { BaseResponse, UserRole } from "@common/global/types";

@injectable()
export class UserRepository implements UserPersistencePort {

    private toPersistence(user: UserEntity): User {
        const userModel = new User();
        userModel.identifier = user.email;  // Maps to `identifier`
        userModel.password = user.password;
        userModel.socialChannel = user.socialChannel;
        userModel.socialChannelId = user.socialChannelId;
        userModel.role = user.role as UserRole;
        return userModel;
    }

    private toDomain(user: User): UserEntity {
        return new UserEntity(
            user.id,
            user.identifier,  // Maps from `identifier`
            user.password,
            user.socialChannel,
            user.socialChannelId,
            null,
            user.role
        );
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const userEntity = await manager.findOneBy(User, { identifier: email });
        if (!userEntity) return null;
        return this.toDomain(userEntity);
    }

    async findBySocialChannelId(socialChannelId: string): Promise<UserEntity | null> {
        const userEntity = await manager.findOneBy(User, { socialChannelId });
        if (!userEntity) return null;
        return this.toDomain(userEntity);
    }

    async createUser(user: UserEntity): Promise<UserEntity> {
        const userEntity = await manager.save(User, this.toPersistence(user));
        return this.toDomain(userEntity);
    }

    async findById(id: string): Promise<UserEntity | null> {
        const userEntity = await manager.findOneBy(User, { id: id });
        if (!userEntity) return null;
        return this.toDomain(userEntity);
    }

    async updateAccountAuthStatus(userId: string, newStatus: AccountAuthStatus): Promise<BaseResponse> {
        try {
            const user = await manager.findOne(User, { where: { id: userId } });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            user.accountAuthStatus = newStatus;
            await manager.save(user);
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    }

    async updatePassword(userId: string, hashedPassword: string): Promise<BaseResponse> {
        try {
            // Find the user
            const user = await manager.findOne(User, { where: { id: userId } });
            if (!user) {
                return { success: false, message: "User not found" };
            }
            user.password = hashedPassword;
            user.passwordResetDate = new Date();
            await manager.save(user);
    
            return { success: true, message: "Password updated successfully" };
        } catch (error) {
            return { success: false };
        }
    }


}