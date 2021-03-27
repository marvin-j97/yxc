import yxc, { createExecutableSchema } from "../src";
import { expect } from "chai";

const schema = yxc.record(yxc.string()).every((s) => !!s.match(/^\w+$/));
const isValid = createExecutableSchema(schema);

describe("Validate a mixed record", () => {
  it("Should validate record", () => {
    expect(
      isValid({
        a: "a",
        b: "b",
        c: "c",
      }).ok,
    ).to.be.true;
  });

  it("Should not validate record", () => {
    expect(
      isValid({
        a: "a",
        b: "b",
        c: "c",
        d: 4,
      }).ok,
    ).to.be.false;
  });
});
