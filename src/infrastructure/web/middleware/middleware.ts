import { validateRequest } from '../util/koa-joi-validate';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AccountSessionStatus } from '@common/auth/enum';
import { logger } from '../util/logger';
import { AccountSessionActivityPersistencePort } from '@ports/out/persistence/account-session-activity.persistence';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence';
import Koa from 'koa';
import { UserRole } from '@common/global/types';

export const getJwtToken = (ctx: Koa.Context): string  => {
    let token = ctx.cookies.get('accessToken');
    return token as string;
};

@injectable()
export class JwtMiddleware {
    constructor(
        @inject('AccountSessionActivityPersistencePort')
        private sessionActivityPersistence: AccountSessionActivityPersistencePort,
        @inject('UserPersistencePort')
        private userPersistence: UserPersistencePort
    ) {}

    async jwtMiddleware(ctx: any, next: Koa.Next) {
        const token = getJwtToken(ctx);
        if (!token) {
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized access' };
            return;
        }

        try {
            const secretKey = process.env.JWT_SECRET as string;
            const decoded = jwt.verify(token, secretKey) as any;
            const { sessionId, id } = decoded;

            const session = await this.sessionActivityPersistence.findById(sessionId);
            if (!session || session?.status === AccountSessionStatus.EXPIRED) {
                ctx.status = 401;
                ctx.body = { message: 'Unauthorized access' };
                return;
            }

            const user = await this.userPersistence.findById(id);
            if (!user) {
                ctx.status = 401;
                ctx.body = { message: 'Unauthorized access' };
                return;
            }

            ctx.state.jwtPayload = decoded;
            ctx.state.user = user;
            await this.sessionActivityPersistence.invalidateActiveSessions(id, sessionId);
            await next();
        } catch (err) {
            logger.error(err);
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized access' };
        }
    }
}

@injectable()
export class AdminMiddleware {
    async adminGuard(ctx: any, next: Koa.Next) {
        const user = ctx.state.user;
        if (!user) {
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized access' };
            return;
        }
        const isAdmin = user.role === UserRole.ADMIN;
        if (!isAdmin) {
            ctx.status = 403;
            ctx.body = { message: 'Access denied: Administrator role required' };
            return;
        }

        await next();
    }
}