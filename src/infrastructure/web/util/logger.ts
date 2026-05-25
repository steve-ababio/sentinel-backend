import * as winston from 'winston';
import * as Sentry from "@sentry/node";
import Transport from 'winston-transport';

const SentryWinstonTransport = Sentry.createSentryWinstonTransport(Transport);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new SentryWinstonTransport()
  ],
});


function safeStringify(obj: any, depth = 2): string {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (depth <= 0) return '[Object]';
      }
      return value;
    });
  } catch (err) {
    return '[Circular]';
  }
}


export function createLogger(module?: any, feature?: any) {
    return winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${module}] [${feature}] ${level}: ${message} ${safeStringify(meta)}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new SentryWinstonTransport()
        // Add file transport or other transports if needed
      ],
    });
  }