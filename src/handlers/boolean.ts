import { AtomicHandler } from "./index";

export class BooleanHandler extends AtomicHandler<boolean> {
  constructor() {
    super();
    this._rules.push(
      (v: unknown) => typeof v === "boolean" || "Must be a boolean",
    );
  }

  true(): BooleanHandler {
    return this.equals(true);
  }

  false(): BooleanHandler {
    return this.equals(false);
  }
}
