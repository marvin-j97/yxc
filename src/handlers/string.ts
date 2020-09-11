import { AtomicHandler } from "./atomic";
import { isEmail } from "../email";

export class StringHandler extends AtomicHandler<string> {
  constructor() {
    super();
    this._rules.push((v) => typeof v === "string" || "Must be a string");
  }

  /**
   * Alias for [[startsWith]]
   */
  prefix(substr: string): this {
    return this.startsWith(substr);
  }

  /**
   * Alias for [[endsWith]]
   */
  suffix(substr: string): this {
    return this.endsWith(substr);
  }

  /**
   * Check ending of a string
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.string().endsWith("pusher").validate("test") // -> Fails
   * yxc.string().endsWith("pusher").validate("Squarepusher") // -> OK
   * ```
   */
  endsWith(substr: string): this {
    this._rules.push(
      (v) => v.endsWith(substr) || `Value has to end with ${substr}`,
    );
    return this;
  }

  /**
   * Alias for [[startsWith]]
   */
  beginsWith(substr: string): this {
    return this.startsWith(substr);
  }

  /**
   * Check beginning of a string
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.string().startsWith("pusher").validate("Squarepusher") // -> Fails
   * yxc.string().startsWith("Squ").validate("Squarepusher") // -> OK
   * ```
   */
  startsWith(substr: string): this {
    this._rules.push(
      (v) => v.startsWith(substr) || `Value has to start with ${substr}`,
    );
    return this;
  }

  /**
   * Check if string is an email
   */
  email(): this {
    this._rules.push((v) => isEmail(v) || `Must be a valid email`);
    return this;
  }

  /**
   * Fails if string contains non-number (0-9) values
   */
  numeric(): this {
    const regexp = /[^0-9]/;
    this._rules.push((v) => (v.length && !regexp.test(v)) || `Must be numeric`);
    return this;
  }

  /**
   * Only allow alphanumeric values
   *
   * @param allowSpaces Allow spaces
   */
  alphanum(allowSpaces?: boolean): this {
    const regexp = allowSpaces ? /[^a-zA-Z0-9 ]/ : /[^a-zA-Z0-9]/;
    this._rules.push(
      (v) => (v.length && !regexp.test(v)) || `Must be alphanumeric`,
    );
    return this;
  }

  /**
   * Check a regex
   */
  regex(regexp: RegExp): this {
    this._rules.push(
      (v: string) => regexp.test(v) || `Does not match ${regexp.toString()}`,
    );
    return this;
  }

  /**
   * Alias for [[regex]]
   */
  match(regexp: RegExp): this {
    return this.regex(regexp);
  }

  /**
   * Alias for [[regex]]
   */
  pattern(regexp: RegExp): this {
    return this.regex(regexp);
  }

  /**
   * Test string length
   */
  length(num: number): this {
    this._rules.push(
      (v: string) => v.length == num || `Must be of length ${num}`,
    );
    return this;
  }

  /**
   * Alias for [[length]]
   */
  len(num: number): this {
    return this.length(num);
  }

  /**
   * Require string to have at least 1 character
   */
  notEmpty(/* TODO: trim? */): StringHandler {
    return this.min(1);
  }

  /**
   * Require string to have a length between min and max
   */
  between(min: number, max: number): this {
    return this.min(min).max(max);
  }

  /**
   * Require minimum string length
   */
  min(min: number): this {
    this._rules.push(
      (v: string) =>
        v.length >= min || `Must be at least ${min} characters long`,
    );
    return this;
  }

  /**
   * Limit string length
   */
  max(max: number): this {
    this._rules.push(
      (v: string) => v.length <= max || `Must have at most ${max} characters`,
    );
    return this;
  }
}
