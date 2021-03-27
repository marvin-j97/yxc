import yxc, { createExecutableSchema } from "../src";
import { expect } from "chai";

const schema = yxc.array(yxc.string()).every((s) => !!s.match(/^\w+$/));
const isValid = createExecutableSchema(schema);

describe("Validate a mixed array", () => {
  it("Should validate array", () => {
    expect(isValid(["a", "b", "c"]).ok).to.be.true;
  });

  it("Should not validate array", () => {
    expect(isValid(["a", "b", "c", 4]).ok).to.be.false;
  });
});
