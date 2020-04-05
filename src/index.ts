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
import { connect, koa, graphql } from "./middlewares";
import { Handler } from "./handlers/index";

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
  object: (schema?: ISchemaDefinition) => new ObjectHandler(schema),
  string: () => new StringHandler(),
  number: () => new NumberHandler(),
  boolean: () => new BooleanHandler(),
  array: <T = any>(handler: Handler) => new ArrayHandler<T>(handler),
  // TODO: any
};
