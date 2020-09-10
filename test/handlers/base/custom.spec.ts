import fixture from "./custom.fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../src/index";

function isSeven(v: unknown): v is 7 {
  return typeof v === "number" && v === 7;
}

describe("Base handler custom function", () => {
  describe("Custom", () => {
    for (const test of fixture) {
      const handlers = [
        yxc.any().custom(isSeven),
        yxc.any().use(isSeven),
        yxc.any().test(isSeven),
        yxc.any().check(isSeven),
      ];

      for (const handler of handlers) {
        it("Should validate with custom function", () => {
          const result = createExecutableSchema(handler)(test.value);
          if (test.expected) {
            expect(result.errors).to.be.empty;
          } else {
            expect(result.errors).to.not.be.empty;
          }
          expect(result.ok).to.be.equal(test.expected);
        });
      }
    }
  });
});
