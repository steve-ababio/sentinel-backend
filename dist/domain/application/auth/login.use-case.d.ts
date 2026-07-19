import { LoginPort, LoginPortOptions, LoginResponse } from "@ports/in/auth/login.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
export declare class LoginUseCase implements LoginPort {
    private userPersistence;
    constructor(userPersistence: UserPersistencePort);
    login(loginPortOptions: LoginPortOptions): Promise<LoginResponse>;
    private isValidPassword;
}
