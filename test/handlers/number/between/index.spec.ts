import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

describe("Number between", () => {
  for (const test of fixture) {
    const handler = yxc.number().between(...test.between);
    it(`${test.value} should be a ${
      test.expected ? "valid" : "invalid"
    } number between ${test.between[0]}-${test.between[1]}`, () => {
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
