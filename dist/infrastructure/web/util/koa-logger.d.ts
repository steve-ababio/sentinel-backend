import { Context, Next } from 'koa';
export declare function logRequest(): (ctx: Context, next: Next) => Promise<void>;
