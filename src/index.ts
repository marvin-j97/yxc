import { StringHandler } from "./handlers/string";
import { createSchema, formatResult, createExecutableSchema } from "./schema";
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
import { ISchemaDefinition, IValidationResult } from "./types";

export { IValidationResult, ISchemaDefinition };
export { createSchema, formatResult, createExecutableSchema };

/**
 * Infers a type
 *
 * ```typescript
 * import yxc, { Infer } from "@dotvirus/yxc"
 *
 * const myObject = yxc.object({
 *   name: yxc.string()
 * });
 *
 * type MyType = Infer<typeof myObject>;
 * ```
 */
export type Infer<T extends Handler> = T["_type"];

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
