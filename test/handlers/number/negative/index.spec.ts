import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

describe("Number negative", () => {
  for (const test of fixture) {
    const handler = yxc.number().negative();
    it(`${test.value} should be a ${
      test.expected ? "valid" : "invalid"
    } negative number`, () => {
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
