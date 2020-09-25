import { IValidationResult, Rule } from "../types";
import { log } from "../log";

/**
 * Abstract base handler
 */
export abstract class Handler<T = any> {
  _type!: any;

  protected _rules: Rule<T>[] = [];

  // or(rules: Rule<T>[]) {
  //   this._rules.push((v: T, k, root) => {
  //     let _result: string | null = null;
  //     for (const rule of rules) {
  //       const result = rule(v, k, root);
  //       if (typeof result === "string") {
  //         return result;
  //       }
  //       if (!result) return false;
  //     }
  //     return true;
  //   });
  //   return this;
  // }

  /**
   * Alias for [[custom]]
   */
  test(rule: Rule<T>): Handler {
    this.custom(rule);
    return this;
  }

  /**
   * Alias for [[custom]]
   */
  check(rule: Rule<T>): Handler {
    this.custom(rule);
    return this;
  }

  /**
   * Alias for [[custom]]
   */
  use(rule: Rule<T>): Handler {
    this.custom(rule);
    return this;
  }

  /**
   * Alias for [[custom]]
   */
  rule(rule: Rule<T>): Handler {
    this.custom(rule);
    return this;
  }

  /**
   * Add a custom function to test the value with
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.string().test()
   * ```
   */
  custom(rule: Rule<T>): Handler {
    this._rules.push(rule);
    return this;
  }

  /**
   * Validate a value
   * Returns a [[IValidationResult]] array
   *
   * ```typescript
   * import yxc from "@dotvirus/yxc"
   *
   * yxc.string().validate(myValue)
   * ```
   */
  validate(
    value: unknown,
    key?: string[],
    root?: unknown,
  ): IValidationResult[] {
    const results: { key: string[]; message: string | boolean }[] = [];

    log("Checking rules");
    for (const rule of this._rules) {
      const result = rule(<any>value, key || [], root || value);
      if (typeof result === "string" || !result) {
        log("Rule failed!");
        results.push({ key: key || [], message: result });
        log("Rule result: " + result);
        return results;
      } else {
        log("Rule passed!");
      }
    }

    log(`Checked rules, ${results.length} errors`);
    return results;
  }
}
