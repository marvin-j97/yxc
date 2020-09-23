import { AtomicHandler } from "./atomic";

/**
 * Validate any value, use rules to narrow it down
 */
export class AnyHandler extends AtomicHandler<any> {
  constructor() {
    super();
  }

  /**
   * Only allow truthy values (https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
   */
  truthy(): this {
    this._rules.push((v: unknown) => !!v || "Value must be truthy");
    return this;
  }

  /**
   * Only allow falsy values(https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
   */
  falsy(): this {
    this._rules.push((v: unknown) => !v || "Value must be falsy");
    return this;
  }
}
