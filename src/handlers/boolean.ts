import { AtomicHandler } from "./atomic";
import { UnionHandler } from "./union";
import { NullHandler } from "./null";
import { OptionalHandler } from "./optional";

/**
 * Boolean handler
 */
export class BooleanHandler extends AtomicHandler<boolean> {
  constructor() {
    super();
    this._rules.push(
      (v: unknown) => typeof v === "boolean" || "Must be a boolean",
    );
  }

  /**
   * Allows null value
   */
  nullable(): UnionHandler<[this, NullHandler]> {
    return new UnionHandler([this, new NullHandler()]);
  }

  /**
   * Allows undefined value
   */
  optional(): UnionHandler<[this, OptionalHandler]> {
    return new UnionHandler([this, new OptionalHandler()]);
  }

  /**
   * Only allows true
   */
  true(): BooleanHandler {
    return this.equals(true);
  }

  /**
   * Only allows false
   */
  false(): BooleanHandler {
    return this.equals(false);
  }
}
