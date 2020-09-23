import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

describe("Record (number) some", () => {
  for (const test of fixture) {
    const handler = yxc.record(yxc.number()).some((v) => v < 10);
    it(`${test.value} should be a ${
      test.expected ? "valid" : "invalid"
    } number record with a number < 10`, () => {
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
