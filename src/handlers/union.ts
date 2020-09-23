import { Handler } from "./index";
import { NullHandler } from "./null";
import { OptionalHandler } from "./optional";

export class UnionHandler<
  T extends [Handler, Handler, ...Handler[]]
> extends Handler {
  _type!: T[number]["_type"];

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

  constructor(handlers: T) {
    super();
    this._rules.push((v: T[number]["_type"]) => {
      if (handlers.some((h) => h.validate(v).length === 0)) {
        return true;
      }
      // TODO: collect errors and display?
      return "Input is not matching any of the expected schemas";
    });
  }
}
