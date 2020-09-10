import { Rule } from "../types";
import debug from "debug";
import { IValidationResult } from "../schema";

const log = debug("yxc");

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

  test(rule: Rule<T>): Handler {
    this.custom(rule);
    return this;
  }

  check(rule: Rule<T>): Handler {
    this.custom(rule);
    return this;
  }

  use(rule: Rule<T>): Handler {
    this.custom(rule);
    return this;
  }

  custom(rule: Rule<T>): Handler {
    this._rules.push(rule);
    return this;
  }

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
      } else {
        log("Rule passed!");
      }
    }

    log(`Checked rules, ${results.length} errors`);
    return results;
  }
}

export class AtomicHandler<T = string | number | boolean> extends Handler {
  _type!: T;

  equals(expected: T): this {
    this._rules.push(
      (v: T) => v === expected || `Must be equal to ${expected}`,
    );
    return this;
  }

  eq(expected: T): this {
    return this.equals(expected);
  }

  equal(expected: T): this {
    return this.equals(expected);
  }

  enum(values: T[]): this {
    this._rules.push(
      (v: T) =>
        values.includes(v) ||
        `Must be one of the following values: ${values.join(", ")}`,
    );
    return this;
  }
}
