import { UnionHandler } from "./union";
import { NullHandler } from "./null";
import { Handler } from "./index";

export class OptionalHandler extends Handler {
  _type!: undefined;

  constructor() {
    super();
    this._rules.push((v: unknown) => v === undefined || "Must be undefined");
  }

  nullable(): UnionHandler<[this, NullHandler]> {
    return new UnionHandler([this, new NullHandler()]);
  }
}

export const UndefinedHandler = OptionalHandler;
