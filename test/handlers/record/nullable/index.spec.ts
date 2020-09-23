import fixture from "./fixture";
import { expect } from "chai";
import yxc, { createExecutableSchema } from "../../../../src/index";

describe("Record string nullable", () => {
  for (const test of fixture) {
    const handler = yxc.record(yxc.string()).nullable();
    it(`${test.value} should be a ${
      test.expected ? "valid" : "invalid"
    } nullable string record`, () => {
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
