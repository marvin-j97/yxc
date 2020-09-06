import { Handler } from "./index";

export class UnionHandler extends Handler<unknown> {
  constructor(handlers: Handler<unknown>[]) {
    super();
    this._rules.push((v) => {
      if (handlers.some((h) => h.validate(v).length === 0)) {
        return true;
      }
      return "Input is not matching any of the expected schemas";
    });
  }
}
