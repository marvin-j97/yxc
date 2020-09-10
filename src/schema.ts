import { Handler } from "./handlers/index";
import { ObjectHandler } from "./handlers/object";
import { ISchemaDefinition, IValidationResult } from "./types";

export function createExecutableSchema(handler: Handler) {
  return (value: unknown) => {
    const result = handler.validate(value, [], value);
    return {
      ok: !result.length,
      errors: result,
    };
  };
}

export function createSchema(def: ISchemaDefinition) {
  return createExecutableSchema(new ObjectHandler(def));
}

export function formatResult(result: IValidationResult[]): string[] {
  return result.map((v) => v.key.join(".") + ": " + v.message);
}
