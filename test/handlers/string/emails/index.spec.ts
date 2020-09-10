import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

describe("String email check", () => {
  for (const test of fixture) {
    const handler = yxc.string().email();
    it(`${test.email} should be a ${
      test.expected ? "valid" : "invalid"
    } email`, () => {
      const result = createExecutableSchema(handler)(test.email);
      if (test.expected) {
        expect(result.errors).to.be.empty;
      } else {
        expect(result.errors).to.not.be.empty;
      }
      expect(result.ok).to.be.equal(test.expected);
    });
  }
});
