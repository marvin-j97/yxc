import debug from "debug";
import { ISchemaDefinition, createExecutableSchema } from "./index";
import { IValidationResult } from "./schema";
import { ObjectHandler } from "./handlers/object";

const log = debug("yxc");

export function connect(
  schema: ISchemaDefinition,
  formatError?: (result: IValidationResult[]) => any,
) {
  return async (req: any, res: any, next: (error?: unknown) => unknown) => {
    try {
      const handler = new ObjectHandler(schema).arbitrary();
      const result = createExecutableSchema(handler)(req);

      if (!result.ok) {
        log(`Validation fail, calling error middleware...`);
        next(formatError ? formatError(result.errors) : 400);
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
  throw: (code: number, message: string) => void;
}

export function koa(
  schema: ISchemaDefinition,
  formatError?: (result: IValidationResult[]) => any,
) {
  return async (ctx: IKoaContext, next: Function) => {
    const handler = new ObjectHandler(schema).arbitrary();
    const result = createExecutableSchema(handler)(ctx);

    if (!result.ok) {
      log(`Validation fail, calling error middleware...`);
      ctx.throw(400, formatError ? formatError(result.errors) : "Bad request");
    } else {
      log(`Validation success, calling next middleware...`);
      return next();
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
  info: any,
) => Promise<any>;

export function graphql(
  schema: ISchemaDefinition,
  cb: IGraphQLResolver,
  formatError?: (result: IValidationResult[]) => any,
) {
  return async (parent: unknown, args: any, ctx: unknown, info: unknown) => {
    try {
      const handler = new ObjectHandler(schema).arbitrary();
      const result = createExecutableSchema(handler)(args);

      if (!result.ok) {
        log(`Validation fail, throwing error...`);
        throw new Error(
          formatError ? formatError(result.errors) : "BAD_REQUEST",
        );
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
