import { Handler } from "./index";
import { IValidationResult, ISchemaDefinition } from "../schema";
import debug from "debug";
import { UnionHandler } from "./union";
import { NullHandler } from "./null";
import { OptionalHandler } from "./optional";
import { Infer } from "../index";

const log = debug("yxc");

function deepSet(
  root: Record<string, any>,
  segments: string[],
  value: unknown,
): void {
  // Iterative deep object descent & set
  let obj = root;

  for (let i = 0; i < segments.length; i++) {
    const current = obj;
    const seg = segments[i];

    if (i < segments.length - 1) {
      obj = obj[seg];
    } else {
      if (typeof obj === "object" && obj !== null) {
        obj[seg] = value;
      } else {
        throw new TypeError(`Tried to set property of atomic value`);
      }
    }

    if (obj === undefined) {
      const nextSeg = segments[i + 1];
      if (/^[0-9]+$/.test(nextSeg.toString()) || typeof nextSeg === "number") {
        current[seg] = [];
      } else {
        current[seg] = {};
      }
      obj = current[seg];
    }
  }
}

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

  nullable(): UnionHandler<[this, NullHandler]> {
    return new UnionHandler([this, new NullHandler()]);
  }

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
            //getResults(handler.optional());
          } else {
            getResults(handler);
          }
        } /* else {
          if (handler.onBefore) {
            log("Before hook");
            handler.onBefore(_value[myKey], [...key, myKey], root);
          }

          if (handler.default && _value[myKey] === undefined) {
            log("Using default value");
            const defVal = handler.default(
              _value[myKey],
              [...key, myKey],
              root,
            );
            deepSet(<Record<string, unknown>>root, [...key, myKey], defVal);
          } else {
            if (handler.mutateBefore) {
              log("Mutate before");
              const mutate = handler.mutateBefore(
                _value[myKey],
                [...key, myKey],
                root,
              );
              deepSet(<Record<string, unknown>>root, [...key, myKey], mutate);
            }

            const toCheck = this._partial
              ? handler.handler .optional()
              : handler.handler;

            const hadError = !!getResults(toCheck).length;

            if (!hadError && handler.mutateAfter) {
              log("Mutate after");
              const mutate = handler.mutateAfter(
                _value[myKey],
                [...key, myKey],
                root,
              );
              deepSet(_value, [...key, myKey], mutate);
            } else {
              log("Skipping mutate after because validation failed");
            }
          }

          if (handler.onAfter) {
            log("After hook");
            handler.onAfter(_value[myKey], [...key, myKey], root);
          }
        }*/
      }
    }

    return myResults.concat(keyResults);
  }
}
