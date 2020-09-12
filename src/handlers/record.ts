import { Handler } from "./index";
import { IValidationResult } from "../types";
import { Infer } from "../index";
import { isObject } from "../util";
import { BaseHandler } from "./base";

export class RecordHandler<T extends Handler> extends BaseHandler {
  _type!: Record<string, Infer<T>>;

  private _schema: Handler;

  constructor(schema: T) {
    super();
    this._rules.push((v) => isObject(v) || "Must be an object");
    this._schema = schema;
  }

  any(pred: (v: Infer<T>, k: string, obj: any) => boolean): this {
    return this.some(pred);
  }

  all(pred: (v: Infer<T>, k: string, obj: any) => boolean): this {
    return this.every(pred);
  }

  some(pred: (v: Infer<T>, k: string, obj: any) => boolean): this {
    this._rules.push((o) => Object.keys(o).some((k) => pred(o[k], k, o)));
    return this;
  }

  every(pred: (v: Infer<T>, k: string, obj: any) => boolean): this {
    this._rules.push((o) => Object.keys(o).every((k) => pred(o[k], k, o)));
    return this;
  }

  numKeys(num: number): this {
    this._rules.push(
      (v: { [k: string]: Infer<T> }) =>
        Object.keys(v).length == num || `Must have ${num} keys`,
    );
    return this;
  }

  validate(
    value: unknown,
    key: string[] = [],
    root?: unknown,
  ): IValidationResult[] {
    const myResults = super.validate(value, key, root);
    const keyResults: IValidationResult[] = [];

    if (typeof value === "object") {
      const _value = <Record<string, unknown>>value;

      for (const myKey in _value) {
        const results = this._schema.validate(
          _value[myKey],
          [...key, myKey],
          root,
        );
        keyResults.push(...results);
      }
    }

    return myResults.concat(keyResults);
  }
}
