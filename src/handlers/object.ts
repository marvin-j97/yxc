import { Handler } from "./index";
import { IValidationResult, ISchemaDefinition } from "../schema";
// import debug from "debug";
import { UnionHandler } from "./union";
import { NullHandler } from "./null";
import { OptionalHandler } from "./optional";
import { Infer } from "../index";

// const log = debug("yxc"); // TODO: use logging

export class ObjectHandler<T extends Record<string, Handler>> extends Handler {
  _type!: {
    [K in keyof T]: Infer<T[K]>;
  };

  private _keys: ISchemaDefinition = {};
  private _arbitrary = false;
  private _partial = false;

  constructor(keys?: ISchemaDefinition) {
    super();
    this._rules.push(
      (v) =>
        (typeof v === "object" && !Array.isArray(v) && v !== null) ||
        "Must be an object",
    );
    if (keys) {
      this._keys = keys;
    }
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
        [K in keyof T]: T[K]["_type"];
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
        [K in keyof T]: T[K]["_type"];
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
        [K in keyof T]: T[K]["_type"];
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
        [K in keyof T]: T[K]["_type"];
      },
      k: string,
      obj: any,
    ) => boolean,
  ): this {
    this._rules.push((o) => Object.keys(o).every((k) => pred(o[k], k, o)));
    return this;
  }

  partial(): this {
    this._partial = true;
    return this;
  }

  arbitrary(): this {
    this._arbitrary = true;
    return this;
  }

  numKeys(num: number): this {
    this._rules.push(
      (
        v: {
          [K in keyof T]: T[K]["_type"];
        },
      ) => Object.keys(v).length == num || `Must have ${num} keys`,
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

    if (typeof value === "object" && value !== null) {
      const _value = <Record<string, unknown>>value;

      if (!this._arbitrary) {
        for (const objKey in _value) {
          const handler = this._keys[objKey];

          if (!handler) {
            keyResults.push({
              key: [...key, objKey],
              message: "Value not allowed",
            });
          }
        }
      }

      for (const myKey in this._keys) {
        const handler = this._keys[myKey];

        const getResults = (handler: Handler) => {
          const results = handler.validate(
            _value[myKey],
            [...key, myKey],
            root,
          );
          keyResults.push(...results);
          return results;
        };

        if (handler instanceof Handler) {
          if (this._partial) {
            getResults(new UnionHandler([handler, new OptionalHandler()]));
          } else {
            getResults(handler);
          }
        }
      }
    }

    return myResults.concat(keyResults);
  }
}
