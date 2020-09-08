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

export { IKeyOptions, ISchemaDefinition };

export {
  createSchema,
  formatResult,
  createExecutableSchema,
  connect,
  koa,
  graphql,
};

export default {
  object: (schema?: ISchemaDefinition): ObjectHandler =>
    new ObjectHandler(schema),
  string: (): StringHandler => new StringHandler(),
  number: (): NumberHandler => new NumberHandler(),
  boolean: (): BooleanHandler => new BooleanHandler(),
  array: <T = any>(handler: Handler): ArrayHandler<T> =>
    new ArrayHandler<T>(handler),
  any: (): AnyHandler => new AnyHandler(),
  union: (handlers: Handler[]): UnionHandler => new UnionHandler(handlers),
  null: (): NullHandler => new NullHandler(),
};
