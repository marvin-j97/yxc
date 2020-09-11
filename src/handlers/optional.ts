import { Handler } from "./index";
import { UnionHandler } from "./union";
import { NullHandler } from "./null";

export class OptionalHandler extends Handler {
  _type!: undefined;

  constructor() {
    super();
    this._rules.push((v: unknown) => v === undefined || "Must be undefined");
  }

  /**
   * Allows null value
   */
  nullable(): UnionHandler<[this, NullHandler]> {
    return new UnionHandler([this, new NullHandler()]);
  }
}

export const UndefinedHandler = OptionalHandler;
