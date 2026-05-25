import { UserEntity } from "@domain/models/entities/user.entity";
import { LoginPort, LoginPortOptions, LoginResponse } from "@ports/in/auth/login.port";
import bcrypt from 'bcrypt';
import { SocialChannel } from "@common/auth/enum";
import { autoInjectable, inject } from "tsyringe";
import { createLogger } from "@infrastructure/web/util/logger";
import { STATUS_CODES } from "@common/web/status-codes";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence";
import { AUTH_MESSAGES } from "@common/auth/constants";
import { RouteError } from "@infrastructure/web/util/route-error";
const logger = createLogger('USE_CASE', 'LOGIN');


@autoInjectable()
export class LoginUseCase implements LoginPort {
  constructor(
    @inject('UserPersistencePort') private userPersistence: UserPersistencePort,
  ) { }

  async login(loginPortOptions:LoginPortOptions): Promise<LoginResponse> {
    const {socialChannel,socialChannelId,email,password} = loginPortOptions;
    let existingUser: UserEntity | undefined;
    if (socialChannel !== SocialChannel.NONE) {
        existingUser = await this.userPersistence.findBySocialChannelId(socialChannelId as string) as UserEntity;
        if (!existingUser) {
            logger.warn(`Login attempt with non-existing socialChannelId: ${socialChannelId}`);
            throw new RouteError(STATUS_CODES.UNAUTHORIZED,AUTH_MESSAGES.INVALID_EMAIL_PASSWORD);
        }
    }else {
        existingUser = await this.userPersistence.findByEmail(email) as UserEntity;
        if (!existingUser) {
            logger.warn(`Login attempt with non-existing email: ${email}`);
            throw new RouteError(STATUS_CODES.UNAUTHORIZED, AUTH_MESSAGES.INVALID_EMAIL_PASSWORD);
        }
        const isValidPassword = await this.isValidPassword(password as string, existingUser.password as string);
        if (!isValidPassword) {
          logger.warn(`Invalid password attempt for user: ${existingUser.id}`);
          throw new RouteError(STATUS_CODES.UNAUTHORIZED, AUTH_MESSAGES.INVALID_EMAIL_PASSWORD);
        }
        logger.info(`Password validated for user: ${existingUser.id}`);
    }
    logger.info(`User logged in: ${existingUser.id}`);
    return {user:existingUser};
  }


  private async isValidPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}