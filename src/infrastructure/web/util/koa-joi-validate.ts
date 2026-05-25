import Koa from 'koa'
import { IMiddleware } from 'koa-router'
import Joi from 'joi'
import { STATUS_CODES } from '@common/web/status-codes'

/**
 * Helper function to validate an object against the provided schema,
 * and to throw a custom error if object is not valid.
 *
 * @param {Object} object The object to be validated.
 * @param {String} label The label to use in the error message.
 * @param {JoiSchema} schema The Joi schema to validate the object against.
 */
function validateObject(
  object = {},
  label: string,
  schema: Joi.Schema,
  options?: Joi.ValidationOptions,
): void {
  // Skip validation if no schema is provided
  if (schema) {
    // Validate the object against the provided schema
    const { error } = schema.validate(object, options)
    if (error) {
      // Throw error with custom message if validation failed
      throw new Error(`Invalid ${label} - ${error.message}`)
    }
  }
}

/**
 * Generate a Koa middleware function to validate a request using
 * the provided validation objects.
 *
 * @param {Object} validationObj
 * @param {Object} validationObj.headers The request headers schema
 * @param {Object} validationObj.params The request params schema
 * @param {Object} validationObj.query The request query schema
 * @param {Object} validationObj.body The request body schema
 * @returns A validation middleware function.
 */
export function validateRequest(validationObj: ValidationObj): IMiddleware {
  // Return a Koa middleware function
  return async (ctx: any, next: Koa.Next): Promise<void> => {
    try {
      // Validate each request data object in the Koa context object
      validateObject(
        ctx.headers,
        'Headers',
        Joi.object().keys(validationObj.headers),
        {
          allowUnknown: true,
        },
      )
      validateObject(
        ctx.params,
        'URL Parameters',
        Joi.object().keys(validationObj.params),
      )
      validateObject(
        ctx.query,
        'URL Query',
        Joi.object().keys(validationObj.query),
      )

      if (validationObj.cookies) {
        validateObject(
          (ctx as any).cookie || {},
          'Cookies',
          Joi.object().keys(validationObj.cookies),
        )
      }

      if (ctx.request.body) {
        validateObject(
          ctx.request.body,
          'Request Body',
          Joi.object().keys(validationObj.body),
        )
      }

      return next()
    } catch (error: any) {
        ctx.status = STATUS_CODES.BAD_REQUEST;
        ctx.body = {
          message: 'Validation error',
          details: error.message,
        };
        // Optional: If you want to stop further processing, return immediately
        ctx.status = STATUS_CODES.BAD_REQUEST;
        ctx.body = {
          message: 'Validation error',
          details: error instanceof Error ? error.message : 'Unknown error',
        };
  
        // Ensure the function still returns a Promise<void>
        return;
    }
  }
}

interface ValidationObj {
  readonly headers?: Record<string, Joi.SchemaLike>
  readonly params?: Record<string, Joi.SchemaLike>
  readonly query?: Record<string, Joi.SchemaLike>
  readonly body?: Record<string, Joi.SchemaLike>
  readonly cookies?: Record<string, Joi.SchemaLike>
}
