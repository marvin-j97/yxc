import { AtomicHandler } from "./atomic";

/**
 * Number handler
 */
export class NumberHandler extends AtomicHandler<number> {
  constructor() {
    super();
    this._rules.push(
      (v: unknown) =>
        (typeof v === "number" && !isNaN(v)) || "Must be a number",
    );
  }

  /**
   * Only allow natural numbers
   */
  natural(opts?: Partial<{ withZero: boolean }>) {
    return this.integer().positive({ withZero: opts?.withZero });
  }

  /**
   * Alias for [[integer]]
   */
  int(): NumberHandler {
    return this.integer();
  }

  /**
   * Only allows integers (whole numbers)
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.number().validate(4.5) // -> OK
   * yxc.number().integer().validate(4.5) // -> Fails
   * yxc.number().integer().validate(4) // -> OK
   * ```
   */
  integer(): NumberHandler {
    this._rules.push(
      (v: number) => Number.isInteger(v) || `Must be an integer`,
    );
    return this;
  }

  /**
   * Only allows numbers smaller than 0
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.number().validate(0) // -> Fails
   * yxc.number().integer().validate(4) // -> Fails
   * yxc.number().integer().validate(-4) // -> OK
   * ```
   */
  negative(opts?: Partial<{ withZero: boolean }>): NumberHandler {
    if (opts?.withZero) {
      this.max(0);
    } else {
      this._rules.push((v: number) => v < 0 || `Must be a negative number`);
    }
    return this;
  }

  /**
   * Only allows numbers greater than 0
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.number().validate(0) // -> Fails
   * yxc.number().integer().validate(-4) // -> Fails
   * yxc.number().integer().validate(4) // -> OK
   * ```
   */
  positive(opts?: Partial<{ withZero: boolean }>): NumberHandler {
    if (opts?.withZero) {
      this.min(0);
    } else {
      this._rules.push((v: number) => v > 0 || `Must be a positive number`);
    }
    return this;
  }

  /**
   * Only allows numbers in a range between min and max
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.number().between(0, 5).validate(-1) // -> Fails
   * yxc.number().between(0, 5).validate(5.5) // -> Fails
   * yxc.number().between(0, 5).validate(0) // -> OK
   * yxc.number().between(0, 5).validate(3.2) // -> OK
   * yxc.number().between(0, 5).validate(5) // -> OK
   * ```
   */
  between(min: number, max: number): NumberHandler {
    this._rules.push(
      (v: number) => (v >= min && v <= max) || `Must be ${min} and ${max}`,
    );
    return this;
  }

  /**
   * Only allows numbers equal to or greater than min
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.number().min(0).validate(-1) // -> Fails
   * yxc.number().min(0).validate(0) // -> OK
   * yxc.number().min(0).validate(1) // -> OK
   * ```
   */
  min(min: number): NumberHandler {
    this._rules.push((v: number) => v >= min || `Must be ${min} or greater`);
    return this;
  }

  /**
   * Only allows numbers equal to or smaller than min
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.number().max(0).validate(1) // -> Fails
   * yxc.number().max(0).validate(0) // -> OK
   * yxc.number().max(0).validate(-1) // -> OK
   * ```
   */
  max(max: number): NumberHandler {
    this._rules.push(
      (v: number) => v <= max || `Must be less than or equal ${max}`,
    );
    return this;
  }
}
