import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

function isDigit(n: number) {
  return n >= 0 && n < 10;
}

describe("Array (number) some", () => {
  for (const test of fixture) {
    const handler = yxc.array(yxc.number()).some(isDigit);
    it(`${test.value} should be a ${
      test.expected ? "valid" : "invalid"
    } number array 1+ digit`, () => {
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
