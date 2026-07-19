import { AccountSessionActivityPersistencePort } from '@ports/out/persistence/account-session-activity.persistence';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence';
import Koa from 'koa';
export declare const getJwtToken: (ctx: Koa.Context) => string;
export declare class JwtMiddleware {
    private sessionActivityPersistence;
    private userPersistence;
    constructor(sessionActivityPersistence: AccountSessionActivityPersistencePort, userPersistence: UserPersistencePort);
    jwtMiddleware(ctx: any, next: Koa.Next): Promise<void>;
}
export declare class AdminMiddleware {
    adminGuard(ctx: any, next: Koa.Next): Promise<void>;
}
