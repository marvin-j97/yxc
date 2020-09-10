import { Handler } from "./index";
import { IValidationResult } from "../types";
// import debug from "debug";
import { UnionHandler } from "./union";
import { NullHandler } from "./null";
import { OptionalHandler } from "./optional";
import { Infer } from "../index";

// const log = debug("yxc"); // TODO: use logging

export class RecordHandler<T extends Handler> extends Handler {
  _type!: {
    [k: string]: Infer<T>;
  };

  private _schema: Handler;

  constructor(schema: T) {
    super();
    this._rules.push(
      (v) =>
        (typeof v === "object" && !Array.isArray(v) && v !== null) ||
        "Must be an object",
    );
    this._schema = schema;
  }

  /**
   * Allows null value
   */
  nullable(): UnionHandler<[this, NullHandler]> {
    return new UnionHandler([this, new NullHandler()]);
  }

  /**
   * Allows undefined value
   */
  optional(): UnionHandler<[this, OptionalHandler]> {
    return new UnionHandler([this, new OptionalHandler()]);
  }

  any(
    pred: (
      v: {
        [k: string]: Infer<T>;
      },
      k: string,
      obj: any,
    ) => boolean,
  ): this {
    return this.some(pred);
  }

  all(
    pred: (
      v: {
        [k: string]: Infer<T>;
      },
      k: string,
      obj: any,
    ) => boolean,
  ): this {
    return this.every(pred);
  }

  some(
    pred: (
      v: {
        [k: string]: Infer<T>;
      },
      k: string,
      obj: any,
    ) => boolean,
  ): this {
    this._rules.push((o) => Object.keys(o).some((k) => pred(o[k], k, o)));
    return this;
  }

  every(
    pred: (
      v: {
        [k: string]: Infer<T>;
      },
      k: string,
      obj: any,
    ) => boolean,
  ): this {
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
