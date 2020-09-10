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
