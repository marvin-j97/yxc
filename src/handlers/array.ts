import { Handler } from "./index";
import { IValidationResult } from "../schema";

export class ArrayHandler<T = any> extends Handler<T[]> {
  _handler: Handler;

  constructor(handler: Handler) {
    super();
    this._rules.push((v) => Array.isArray(v) || "Must be an array");
    this._handler = handler;
  }

  any(pred: (v: T, i: number, arr: T[]) => boolean) {
    return this.some(pred);
  }

  all(pred: (v: T, i: number, arr: T[]) => boolean) {
    return this.every(pred);
  }

  some(pred: (v: T, i: number, arr: T[]) => boolean) {
    this._rules.push((arr) => arr.some(pred));
    return this;
  }

  every(pred: (v: T, i: number, arr: T[]) => boolean) {
    this._rules.push((arr) => arr.every(pred));
    return this;
  }

  length(num: number) {
    this._rules.push(
      (v: any[]) => v.length == num || `Must be of length ${num}`
    );
    return this;
  }

  len(num: number) {
    this.length(num);
    return this;
  }

  notEmpty() {
    this._rules.push((v: any[]) => !!v.length || `Must not be empty`);
    return this;
  }

  between(min: number, max: number) {
    this._rules.push(
      (v: any[]) =>
        (v.length >= min && v.length <= max) ||
        `Must be between ${min} and ${max} characters long`
    );
    return this;
  }

  min(min: number) {
    this._rules.push(
      (v: any[]) => v.length >= min || `Must be at least ${min} characters long`
    );
    return this;
  }

  max(max: number) {
    this._rules.push(
      (v: any[]) => v.length >= max || `Must have at most ${max} characters`
    );
    return this;
  }

  validate(value: any, key: string[] = [], root?: any): IValidationResult[] {
    const myResults = super.validate(value, key, root);
    const keyResults: IValidationResult[] = [];

    if (Array.isArray(value)) {
      (<any[]>value).forEach((v, i) => {
        const myKey = i.toString();
        const results = this._handler.validate(v, [...key, myKey], root);
        keyResults.push(...results);
      });
    }

    return myResults.concat(keyResults);
  }
}
