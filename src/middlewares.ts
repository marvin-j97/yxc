import debug from "debug";
import { createExecutableSchema } from "./index";
import { IValidationResult } from "./schema";
import { ObjectHandler } from "./handlers/object";

const log = debug("yxc");

export function connect(
  schema: ObjectHandler,
  formatError?: (result: IValidationResult[]) => any
) {
  return async (req: any, res: any, next: Function) => {
    try {
      const result = createExecutableSchema(schema)(req);

      if (result.length) {
        log(`Validation fail, calling error middleware...`);
        next(formatError ? formatError(result) : 400);
      } else {
        log(`Validation success, calling next middleware...`);
        next();
      }
    } catch (error) {
      log(`INTERNAL validation error, calling error middleware with 500...`);
      console.error(error);
      next(500);
    }
  };
}

interface IKoaContext {
  req: any;
  res: any;
  throw: (code: number, message: string) => void;
}

export function koa(
  schema: ObjectHandler,
  formatError?: (result: IValidationResult[]) => any
) {
  return async (ctx: IKoaContext, next: Function) => {
    try {
      const result = createExecutableSchema(schema)(ctx.req);

      if (result.length) {
        log(`Validation fail, calling error middleware...`);
        ctx.throw(400, formatError ? formatError(result) : "Bad request");
      } else {
        log(`Validation success, calling next middleware...`);
        return next();
      }
    } catch (error) {
      log(`INTERNAL validation error, calling error middleware with 500...`);
      console.error(error);
      ctx.throw(500, error.message);
    }
  };
}

/**
 * GraphQL Resolver function
 * https://graphql.org/learn/execution/#root-fields-resolvers
 */
type IGraphQLResolver = (
  parent: any,
  args: any,
  ctx: any,
  info: any
) => Promise<any>;

export function graphql(
  schema: ObjectHandler,
  cb: IGraphQLResolver,
  formatError?: (result: IValidationResult[]) => any
) {
  return async (parent: unknown, args: any, ctx: unknown, info: unknown) => {
    try {
      const result = createExecutableSchema(schema)(args);

      if (result.length) {
        log(`Validation fail, throwing error...`);
        throw new Error(formatError ? formatError(result) : "BAD_REQUEST");
      } else {
        log(`Validation success, calling resolver...`);
        cb(parent, args, ctx, info);
      }
    } catch (error) {
      log(`INTERNAL validation error, throwing 500...`);
      console.error(error);
      throw new Error("SERVER_ERROR");
    }
  };
}
