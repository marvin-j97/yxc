import { Handler } from "./index";

export class StringHandler extends Handler<string> {
  constructor() {
    super();
    this._rules.push((v) => typeof v == "string" || "Must be a string");
  }

  email() {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this._rules.push((v) => emailRegex.test(v) || `Must be a valid email`);
    return this;
  }

  alphanum(allowSpaces?: boolean) {
    const regexp = allowSpaces ? /[^a-zA-Z0-9 ]/ : /[^a-zA-Z0-9]/;
    this._rules.push((v) => !regexp.test(v) || `Must be alphanumeric`);
    return this;
  }

  enum(values: string[]) {
    this._rules.push(
      (v) =>
        values.includes(v) ||
        `Must be one of the following values: ${values.join(", ")}`
    );
    return this;
  }

  regex(regexp: RegExp) {
    this._rules.push(
      (v: string) => regexp.test(v) || `Does not match ${regexp.toString()}`
    );
    return this;
  }

  match(regexp: RegExp) {
    this.regex(regexp);
    return this;
  }

  pattern(regexp: RegExp) {
    this.regex(regexp);
    return this;
  }

  length(num: number) {
    this._rules.push(
      (v: string) => v.length == num || `Must be of length ${num}`
    );
    return this;
  }

  len(num: number) {
    this.length(num);
    return this;
  }

  notEmpty() {
    this.min(1);
    return this;
  }

  between(min: number, max: number) {
    this.min(min).max(max);
    return this;
  }

  min(min: number) {
    this._rules.push(
      (v: string) =>
        v.length >= min || `Must be at least ${min} characters long`
    );
    return this;
  }

  max(max: number) {
    this._rules.push(
      (v: string) => v.length <= max || `Must have at most ${max} characters`
    );
    return this;
  }
}
