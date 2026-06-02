import { RegisterPort, RegisterPortOptions } from "@ports/in/auth/register.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { autoInjectable, inject, injectable } from "tsyringe";
import { IdentifierType,SocialChannel } from "@common/auth/enum";
import { UserEntity } from "@domain/models/entities/user.entity";
import { RouteError } from "@infrastructure/web/util/route-error";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
import { ContactStatus } from "@common/user/enum";
import { STATUS_CODES } from "@common/web/status-codes";
import bcrypt from 'bcrypt';
import { AUTH_MESSAGES } from "@common/auth/constants";

@injectable()
export class RegisterUseCase implements RegisterPort {
    constructor(
        @inject('UserPersistencePort')
        private userPersistence: UserPersistencePort,
        @inject('SendOtpPort')
        private sendOtpPort: SendOtpPort,
        @inject('ContactPersistencePort')
        private contactPersistence: ContactPersistencePort,
    ) { }

    async register({ email, socialChannelId,socialChannel, password }: RegisterPortOptions): Promise<UserEntity> {
        const existingUser = await this.userPersistence.findByEmail(email);
        if (existingUser) throw new RouteError(STATUS_CODES.BAD_REQUEST, AUTH_MESSAGES.ACCOUNT_ASSOCIATED_EMAIL);
    
        let hashedPassword = null;
        if (socialChannel === SocialChannel.NONE) {
            hashedPassword = await this.hash(password as string);
        }
        const newUser = await this.userPersistence.createUser({
            id: null,
            email,
            password: hashedPassword,
            socialChannel,
            socialChannelId
        });
        
        const isSocial = socialChannel && socialChannel !== SocialChannel.NONE;
        
        await Promise.all([
            this.contactPersistence.save({
                userId: newUser.id as string,
                identifier: email,
                identifierType: IdentifierType.EMAIL as any,
                status: isSocial ? ContactStatus.VERIFIED : ContactStatus.PENDING
            }),
            ...(isSocial ? [] : [this.sendOtpPort.sendOtp(email, IdentifierType.EMAIL, newUser.id as string)])
        ]);
        
        return newUser;
    }

    private async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}