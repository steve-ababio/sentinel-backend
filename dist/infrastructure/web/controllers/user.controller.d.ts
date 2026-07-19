import { CreateUserInfoPort } from "@ports/in/user/create-user-info.port";
import { UpdateUserInfoPort } from "@ports/in/user/update-user-info.port";
import { GetUserInfoPort } from "@ports/in/user/get-user-info.port";
export declare class UserController {
    private createUserInfoPort;
    private updateUserInfoPort;
    private getUserInfoPort;
    constructor(createUserInfoPort: CreateUserInfoPort, updateUserInfoPort: UpdateUserInfoPort, getUserInfoPort: GetUserInfoPort);
    createUserInfo(ctx: any): Promise<void>;
    updateUserInfo(ctx: any): Promise<void>;
    getUserInfo(ctx: any): Promise<void>;
}
