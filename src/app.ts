import "reflect-metadata"
import "@infrastructure/tsyringe/container";
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { router } from '@infrastructure/web/routes';
import cookies from 'koa-cookie';
import { createLogger } from '@infrastructure/web/util/logger';
import { RouteError } from '@infrastructure/web/util/route-error';
import { MESSAGES } from '@common/auth/constants';
import userAgent from 'koa-useragent';
import session from 'koa-session';

const logger = createLogger('ROOT', 'KOA');

import * as Sentry from '@sentry/node';

const app: Koa = new Koa();

app.keys = [process.env.SESSION_SECRET || 'super-secret-key'];
app.use(session({}, app))
app.use(userAgent);

// Apply CORS config
app.use(cors({
  origin: (ctx) => {
    const validDomains = ['http://localhost:3000', process.env.FRONTEND_URL];
    if (ctx.request.header.origin && validDomains.includes(ctx.request.header.origin)) {
      return ctx.request.header.origin;
    }
    return 'http://localhost:3000'; // default
  },
  credentials: true,
})); // Replace with your CORS config
// Parse HTTP POST body
app.use(bodyParser({ jsonLimit: '2mb' }));

app.use(cookies());
app.use(bodyParser());
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(async (ctx, next) => {
    try {
      if (!ctx.path.startsWith('/auth/register') && !ctx.path.startsWith('/auth/login')) {
        logger.info('Request Body:', { body: ctx.request.body, path: ctx.path });
      }
      await next();
    } catch (error: any) {
      const isClientAbort = (err: any) => {
        const expectedCodes = ['ECONNRESET', 'EPIPE', 'ERR_STREAM_PREMATURE_CLOSE'];
        const expectedMessages = ['Premature close', 'stream ended early'];
        return (
          (err.code && expectedCodes.includes(err.code)) ||
          (err.message && expectedMessages.some(msg => err.message.includes(msg)))
        );
      };

      if (isClientAbort(error)) {
        logger.info(`Client connection aborted: ${error.message} (${ctx.method} ${ctx.url})`);
        return;
      }

      let routeError: RouteError
      // If error is not a route error, convert to unknown route error
      if (error instanceof RouteError) {
        routeError = error
      } else {
        Sentry.captureException(error);
        routeError = new RouteError(500, MESSAGES.GENERIC_ERROR_HANDLER)
      }
  
      ctx.status = routeError.status
      ctx.body = {
        error: {
          message: routeError.message,
        },
      }
      ctx.app.emit('error', error, ctx)
    }
  });
  
  // Log errors through custom logger
  app.on('error', (error, ctx) => {
    const isClientAbort = (err: any) => {
      const expectedCodes = ['ECONNRESET', 'EPIPE', 'ERR_STREAM_PREMATURE_CLOSE'];
      const expectedMessages = ['Premature close', 'stream ended early'];
      return (
        (err.code && expectedCodes.includes(err.code)) ||
        (err.message && expectedMessages.some(msg => err.message.includes(msg)))
      );
    };

    if (isClientAbort(error)) {
      return;
    }

    logger.error('Unhandled Exception', { 
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...(error instanceof RouteError ? { status: error.status, routeMessage: error.message } : {}),
      error, url: ctx?.url 
    });
  });
  
  // Mount API routes
  app.use(router.routes());
  app.use(router.allowedMethods());
  
  export { app };