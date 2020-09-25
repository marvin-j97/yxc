import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

describe("Optional type check", () => {
  for (const test of fixture) {
    const handler = yxc.optional();
    it(`${test.value} should be a ${
      test.expected ? "valid" : "invalid"
    } optional type`, () => {
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
