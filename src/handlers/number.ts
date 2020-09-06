import { AtomicHandler } from "./index";

export class NumberHandler extends AtomicHandler<number> {
  constructor() {
    super();
    this._rules.push((v) => typeof v === "number" || "Must be a number");
  }

  integer() {
    this._rules.push(
      (v: number) => Number.isInteger(v) || `Must be an integer`
    );
    return this;
  }

  negative() {
    this._rules.push((v: number) => v < 0 || `Must be a negative number`);
    return this;
  }

  positive() {
    this._rules.push((v: number) => v >= 0 || `Must be a positive number`);
    return this;
  }

  between(min: number, max: number) {
    this._rules.push(
      (v: number) => (v >= min && v <= max) || `Must be ${min} and ${max}`
    );
    return this;
  }

  min(min: number) {
    this._rules.push((v: number) => v >= min || `Must be at least ${min}`);
    return this;
  }

  max(max: number) {
    this._rules.push(
      (v: number) => v <= max || `Must be less than or equal ${max}`
    );
    return this;
  }
}
