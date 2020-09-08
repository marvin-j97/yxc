import { Handler } from "./handlers/index";
import { VoidFunc, Mutation } from "./types";
import { ObjectHandler } from "./handlers/object";

export interface IKeyOptions {
  handler: Handler;
  onBefore?: VoidFunc;
  onAfter?: VoidFunc;
  mutateBefore?: Mutation;
  mutateAfter?: Mutation;
  default?: Mutation;
}

export interface IValidationResult {
  key: string[];
  message: string | boolean;
}

export interface ISchemaDefinition {
  [key: string]: Handler | IKeyOptions;
}

export function createExecutableSchema<T>(handler: ObjectHandler) {
  return (value: T) => handler.validate(value, [], value);
}

export function createSchema(def: ISchemaDefinition) {
  return createExecutableSchema(new ObjectHandler(def));
}

export function formatResult(result: IValidationResult[]): string[] {
  return result.map((v) => v.key.join(".") + ": " + v.message);
}
