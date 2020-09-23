import { StringHandler } from "./handlers/string";
import { ObjectHandler } from "./handlers/object";
import { NumberHandler } from "./handlers/number";
import { BooleanHandler } from "./handlers/boolean";
import { ArrayHandler } from "./handlers/array";
import { AnyHandler } from "./handlers/any";
import { UnionHandler } from "./handlers/union";
import { Handler } from "./handlers/index";
import { NullHandler } from "./handlers/null";
import { OptionalHandler } from "./handlers/optional";
import { RecordHandler } from "./handlers/record";
import { ISchemaDefinition } from "./types";

export default {
  object: <T extends ISchemaDefinition>(schema?: T): ObjectHandler<T> =>
    new ObjectHandler(schema),
  record: <T extends Handler>(schema: T): RecordHandler<T> =>
    new RecordHandler(schema),
  string: (): StringHandler => new StringHandler(),
  number: (): NumberHandler => new NumberHandler(),
  boolean: (): BooleanHandler => new BooleanHandler(),
  array: <T extends Handler>(handler: T): ArrayHandler<T> =>
    new ArrayHandler<T>(handler),
  any: (): AnyHandler => new AnyHandler(),
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  union: <T extends [Handler, Handler, ...Handler[]]>(handlers: T) =>
    new UnionHandler(handlers),
  null: (): NullHandler => new NullHandler(),
  optional: (): OptionalHandler => new OptionalHandler(),
  undefined: (): OptionalHandler => new OptionalHandler(),
};

export * from "./types";
export * from "./schema";
