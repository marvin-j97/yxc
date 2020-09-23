import { Handler } from "./handlers/index";

export type Rule<T = any> = (
  val: T,
  key: string[],
  root: any,
) => boolean | string;

export interface IValidationResult {
  key: string[];
  message: string | boolean;
}

export interface ISchemaDefinition {
  [key: string]: Handler;
}

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
