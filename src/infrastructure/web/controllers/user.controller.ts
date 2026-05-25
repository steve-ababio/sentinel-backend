import { createLogger } from "../util/logger";
import { inject, injectable } from "tsyringe";
import { STATUS_CODES } from "@common/web/status-codes";
import { handleRouteError } from "@common/global/utils";
import { CreateUserInfoPort } from "@ports/in/user/create-user-info.port";
import { UpdateUserInfoPort } from "@ports/in/user/update-user-info.port";
import { GetUserInfoPort } from "@ports/in/user/get-user-info.port";

const logger = createLogger('CONTROLLER', 'USER');

@injectable()
export class UserController {

    constructor(
        @inject("CreateUserInfoPort") private createUserInfoPort: CreateUserInfoPort,
        @inject("UpdateUserInfoPort") private updateUserInfoPort: UpdateUserInfoPort,
         @inject("GetUserInfoPort") private getUserInfoPort: GetUserInfoPort
    ) {}

    async createUserInfo(ctx: any) {
        try {
            const userId = ctx.state.jwtPayload.id
            const dto = ctx.request.body;
            const response = await this.createUserInfoPort.createUserInfo({...dto,userId});
            ctx.status = STATUS_CODES.CREATED;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }

    async updateUserInfo(ctx: any) {
        try {
            const userId = ctx.state.jwtPayload.id
            const dto = ctx.request.body;
            const response = await this.updateUserInfoPort.updateUserInfo({...dto,userId});
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
    async getUserInfo(ctx:any){
        try {
            const userId = ctx.state.jwtPayload.id
            const response = await this.getUserInfoPort.getUserInfo(userId);
            ctx.status = STATUS_CODES.OK;
            ctx.body = response;
        } catch (error) {
            handleRouteError(error, ctx, logger);
        }
    }
}
