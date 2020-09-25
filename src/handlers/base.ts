import { Handler } from "./index";
import { UnionHandler } from "./union";
import { NullHandler } from "./null";
import { OptionalHandler } from "./optional";

/**
 * Base handler
 */
export abstract class BaseHandler<T = any> extends Handler<T> {
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
}
