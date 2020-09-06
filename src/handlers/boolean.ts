import { AtomicHandler } from "./index";

export class BooleanHandler extends AtomicHandler<boolean> {
  constructor() {
    super();
    this._rules.push((v) => typeof v === "boolean" || "Must be a boolean");
  }

  true() {
    this._rules.push((v) => v == true || "Must be true");
    return this;
  }

  false() {
    this._rules.push((v) => v == false || "Must be false");
    return this;
  }
}
