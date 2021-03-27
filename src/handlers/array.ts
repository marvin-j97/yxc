import { Handler } from "./index";
import { IValidationResult } from "../types";
import { Infer } from "../index";
import { BaseHandler } from "./base";

const arrayRule = (v: unknown) => Array.isArray(v) || "Must be an array";

export class ArrayHandler<T extends Handler> extends BaseHandler {
  _type!: Array<Infer<T>>;

  _handler: Handler;

  constructor(handler: T) {
    super();
    this._rules.push(arrayRule);
    this._handler = handler;
  }

  any(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this {
    return this.some(pred);
  }

  all(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this {
    return this.every(pred);
  }

  some(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this {
    this._rules.push((arr: Array<Infer<T>>) => arr.some(pred));
    return this;
  }

  every(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this {
    this._rules.push((arr: Array<Infer<T>>) => arr.every(pred));
    return this;
  }

  length(num: number): this {
    this._rules.push(
      (v: any[]) => v.length === num || `Must be of length ${num}`,
    );
    return this;
  }

  len(num: number): this {
    this.length(num);
    return this;
  }

  notEmpty(): this {
    this._rules.push((v: Array<Infer<T>>) => !!v.length || `Must not be empty`);
    return this;
  }

  between(min: number, max: number): this {
    return this.min(min).max(max);
  }

  min(min: number): this {
    this._rules.push(
      (v: Array<Infer<T>>) =>
        v.length >= min || `Must have at least ${min} items`,
    );
    return this;
  }

  max(max: number): this {
    this._rules.push(
      (v: Array<Infer<T>>) =>
        v.length <= max || `Must have at most ${max} items`,
    );
    return this;
  }

  validate(
    value: unknown,
    key: string[] = [],
    root?: unknown,
  ): IValidationResult[] {
    let myResults: IValidationResult[] = [];
    const keyResults: IValidationResult[] = [];

    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        const myKey = i.toString();
        const results = this._handler.validate(v, [...key, myKey], root);
        keyResults.push(...results);
      });
    }

    if (!keyResults.length) {
      myResults = super.validate(value, key, root);
    }

    return myResults.concat(keyResults);
  }
}
