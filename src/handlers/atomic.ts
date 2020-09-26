import { BaseHandler } from "./base";

/**
 * Base handler for atomic values
 */
export abstract class AtomicHandler<
  T = string | number | boolean
> extends BaseHandler<T> {
  _type!: T;

  /**
   * Only allows a certain value
   * Value is checked using strict equality (===)
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.string().equals("test").validate("test") // -> OK
   * yxc.string().equals("test").validate("test2") // -> Fails
   * ```
   */
  equals(expected: T): this {
    this._rules.push(
      (v: T) => v === expected || `Must be equal to ${expected}`,
    );
    return this;
  }

  /**
   * Alias for [[equals]]
   */
  eq(expected: T): this {
    return this.equals(expected);
  }

  /**
   * Alias for [[equals]]
   */
  equal(expected: T): this {
    return this.equals(expected);
  }

  /**
   * Only allows a selection of values
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * const allowedValues = ["test", "test2", "test3"]
   *
   * yxc.string().enum(allowedValues).validate("test") // -> OK
   * yxc.string().enum(allowedValues).validate("asdasd") // -> Fails
   * ```
   */
  enum(values: T[]): this {
    this._rules.push(
      (v: T) =>
        values.includes(v) ||
        `Must be one of the following values: ${values.join(", ")}`,
    );
    return this;
  }
}
