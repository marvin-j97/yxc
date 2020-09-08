import { AtomicHandler } from "./index";

export class StringHandler extends AtomicHandler<string> {
  constructor() {
    super();
    this._rules.push((v) => typeof v === "string" || "Must be a string");
  }

  endsWith(substr: string): StringHandler {
    this._rules.push((v) => v.endsWith(substr));
    return this;
  }

  beginsWith(substr: string): StringHandler {
    return this.startsWith(substr);
  }

  startsWith(substr: string): StringHandler {
    this._rules.push((v) => v.startsWith(substr));
    return this;
  }

  email(): StringHandler {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this._rules.push((v) => emailRegex.test(v) || `Must be a valid email`);
    return this;
  }

  numeric(): StringHandler {
    const regexp = /[^0-9]/;
    this._rules.push((v) => !regexp.test(v) || `Must be numeric`);
    return this;
  }

  alphanum(allowSpaces?: boolean): StringHandler {
    const regexp = allowSpaces ? /[^a-zA-Z0-9 ]/ : /[^a-zA-Z0-9]/;
    this._rules.push((v) => !regexp.test(v) || `Must be alphanumeric`);
    return this;
  }

  regex(regexp: RegExp): StringHandler {
    this._rules.push(
      (v: string) => regexp.test(v) || `Does not match ${regexp.toString()}`,
    );
    return this;
  }

  match(regexp: RegExp): StringHandler {
    return this.regex(regexp);
  }

  pattern(regexp: RegExp): StringHandler {
    return this.regex(regexp);
  }

  length(num: number): StringHandler {
    this._rules.push(
      (v: string) => v.length == num || `Must be of length ${num}`,
    );
    return this;
  }

  len(num: number): StringHandler {
    return this.length(num);
  }

  notEmpty(): StringHandler {
    return this.min(1);
  }

  between(min: number, max: number): StringHandler {
    return this.min(min).max(max);
  }

  min(min: number): StringHandler {
    this._rules.push(
      (v: string) =>
        v.length >= min || `Must be at least ${min} characters long`,
    );
    return this;
  }

  max(max: number): StringHandler {
    this._rules.push(
      (v: string) => v.length <= max || `Must have at most ${max} characters`,
    );
    return this;
  }
}
