import { UnionHandler } from "./union";
import { OptionalHandler } from "./optional";
import { Handler } from "./index";

export class NullHandler extends Handler {
  _type!: null;

  constructor() {
    super();
    this._rules.push((v: unknown) => v === null || "Must be null");
  }

  optional(): UnionHandler<[this, OptionalHandler]> {
    return new UnionHandler([this, new OptionalHandler()]);
  }
}
