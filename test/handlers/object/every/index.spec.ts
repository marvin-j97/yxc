import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

function isDigit(n: number) {
  return n >= 0 && n < 10;
}

describe("Object every", () => {
  for (const test of fixture) {
    const handler = yxc
      .object()
      .arbitrary()
      .every(<any>isDigit);
    it(`${test.value} should be a ${
      test.expected ? "valid" : "invalid"
    } object all digits`, () => {
      const result = createExecutableSchema(handler)(test.value);
      if (test.expected) {
        expect(result.errors).to.be.empty;
      } else {
        expect(result.errors).to.not.be.empty;
      }
      expect(result.ok).to.be.equal(test.expected);
    });
  }
});
