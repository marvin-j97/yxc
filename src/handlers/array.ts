import { Handler } from "./index";
import { IValidationResult } from "../schema";
import { UnionHandler } from "./union";
import { NullHandler } from "./null";
import { OptionalHandler } from "./optional";

export class ArrayHandler<T extends Handler> extends Handler {
  _type!: Array<T["_type"]>;

  _handler: Handler;

  constructor(handler: Handler) {
    super();
    this._rules.push((v: unknown) => Array.isArray(v) || "Must be an array");
    this._handler = handler;
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

  any(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T> {
    return this.some(pred);
  }

  all(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T> {
    return this.every(pred);
  }

  some(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T> {
    this._rules.push((arr: Array<T["_type"]>) => arr.some(pred));
    return this;
  }

  every(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T> {
    this._rules.push((arr: Array<T["_type"]>) => arr.every(pred));
    return this;
  }

  length(num: number): ArrayHandler<T> {
    this._rules.push(
      (v: any[]) => v.length == num || `Must be of length ${num}`,
    );
    return this;
  }

  len(num: number): ArrayHandler<T> {
    this.length(num);
    return this;
  }

  notEmpty(): ArrayHandler<T> {
    this._rules.push(
      (v: Array<T["_type"]>) => !!v.length || `Must not be empty`,
    );
    return this;
  }

  between(min: number, max: number): ArrayHandler<T> {
    this._rules.push(
      (v: Array<T["_type"]>) =>
        (v.length >= min && v.length <= max) ||
        `Must have between ${min} and ${max} items`,
    );
    return this;
  }

  min(min: number): ArrayHandler<T> {
    this._rules.push(
      (v: Array<T["_type"]>) =>
        v.length >= min || `Must have at least ${min} items`,
    );
    return this;
  }

  max(max: number): ArrayHandler<T> {
    this._rules.push(
      (v: Array<T["_type"]>) =>
        v.length <= max || `Must have at most ${max} items`,
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

    if (Array.isArray(value)) {
      (<Array<T["_type"]>>value).forEach((v, i) => {
        const myKey = i.toString();
        const results = this._handler.validate(v, [...key, myKey], root);
        keyResults.push(...results);
      });
    }

    return myResults.concat(keyResults);
  }
}
