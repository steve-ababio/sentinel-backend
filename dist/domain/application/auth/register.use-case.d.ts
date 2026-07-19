import { RegisterPort, RegisterPortOptions } from "@ports/in/auth/register.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { UserEntity } from "@domain/models/entities/user.entity";
import { SendOtpPort } from "@ports/in/auth/send-otp.port";
import { ContactPersistencePort } from "@ports/out/persistence/contact.persistence.port";
export declare class RegisterUseCase implements RegisterPort {
    private userPersistence;
    private sendOtpPort;
    private contactPersistence;
    constructor(userPersistence: UserPersistencePort, sendOtpPort: SendOtpPort, contactPersistence: ContactPersistencePort);
    register({ email, socialChannelId, socialChannel, password }: RegisterPortOptions): Promise<UserEntity>;
    private hash;
}
