import { StringHandler } from "./handlers/string";
import {
  createSchema,
  IKeyOptions,
  ISchemaDefinition,
  formatResult,
  createExecutableSchema,
} from "./schema";
import { ObjectHandler } from "./handlers/object";
import { NumberHandler } from "./handlers/number";
import { BooleanHandler } from "./handlers/boolean";
import { ArrayHandler } from "./handlers/array";
import { AnyHandler } from "./handlers/any";
import { UnionHandler } from "./handlers/union";
import { connect, koa, graphql } from "./middlewares";
import { Handler } from "./handlers/index";
import { NullHandler } from "./handlers/null";
import { OptionalHandler } from "./handlers/optional";

export { IKeyOptions, ISchemaDefinition };

export {
  createSchema,
  formatResult,
  createExecutableSchema,
  connect,
  koa,
  graphql,
};

export type Infer<T extends Handler> = T["_type"];

export default {
  object: <T extends ISchemaDefinition>(schema?: T): ObjectHandler<T> =>
    new ObjectHandler(schema),
  string: (): StringHandler => new StringHandler(),
  number: (): NumberHandler => new NumberHandler(),
  boolean: (): BooleanHandler => new BooleanHandler(),
  array: <T extends Handler>(handler: T): ArrayHandler<T> =>
    new ArrayHandler<T>(handler),
  any: (): AnyHandler => new AnyHandler(),
  union: <T extends [Handler, Handler, ...Handler[]]>(handlers: T) =>
    new UnionHandler(handlers),
  null: (): NullHandler => new NullHandler(),
  optional: (): OptionalHandler => new OptionalHandler(),
  undefined: (): OptionalHandler => new OptionalHandler(),
};
