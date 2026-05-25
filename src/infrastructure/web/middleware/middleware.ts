import { validateRequest } from '../util/koa-joi-validate'
import Joi from 'joi'
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AccountSessionStatus } from '@common/auth/enum';
import { logger } from '../util/logger';
import { AccountSessionActivityPersistencePort } from '@ports/out/persistence/account-session-activity.persistence';
import Koa from 'koa';

export const getJwtToken = (ctx: Koa.Context): string  => {
    let token = ctx.cookies.get('accessToken');
    return token as string;
};

@injectable()
export class JwtMiddleware {
    constructor(
        @inject('AccountSessionActivityPersistencePort')
        private sessionActivityPersistence: AccountSessionActivityPersistencePort
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
            if (!session) {
                ctx.status = 401;
                ctx.body = { message: 'Unauthorized access' };
                return;
            }
            if (session?.status === AccountSessionStatus.EXPIRED) {
                ctx.status = 401;
                ctx.body = { message: 'Unauthorized access' };
                return;
            }

            ctx.state.jwtPayload = decoded;
            await this.sessionActivityPersistence.invalidateActiveSessions(id, sessionId);
            await next();
        } catch (err) {
            logger.error(err);
            ctx.status = 401;
            ctx.body = { message: 'Unauthorized access' };
        }
    }
}
// export const validateJwtCookie = validateRequest({
// //   cookies: {
//     // accessToken: Joi.string()
//     //   .regex(/[A-Za-z0-9._-]{20,2000}/)
//     //   .required()
//     //   .error(() => new Error('Improperly formatted access token')),
// //   },
// });