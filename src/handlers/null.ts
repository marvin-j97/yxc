import { UnionHandler } from "./union";
import { OptionalHandler } from "./optional";
import { Handler } from "./index";

/**
 * Null handler
 */
export class NullHandler extends Handler {
  _type!: null;

  constructor() {
    super();
    this._rules.push((v: unknown) => v === null || "Must be null");
  }

  /**
   * Allows undefined value
   */
  optional(): UnionHandler<[this, OptionalHandler]> {
    return new UnionHandler([this, new OptionalHandler()]);
  }
}
