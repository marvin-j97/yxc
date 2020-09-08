import { AnyHandler } from "./any";

export class NullHandler extends AnyHandler {
  constructor() {
    super();
    this.nullable();
    this._rules.push((v) => v === null || "Must be null");
  }
}
