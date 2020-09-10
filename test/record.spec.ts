import yxc, { createExecutableSchema } from "../src/index";
import { expect } from "chai";

it("Should be a valid number record", () => {
  expect(
    createExecutableSchema(yxc.record(yxc.number()))({}).errors,
  ).to.have.length(0);
});

it("Should be a valid number record", () => {
  expect(
    createExecutableSchema(yxc.record(yxc.number()))({
      a: 2,
      4: 5.5,
    }).errors,
  ).to.have.length(0);
});

it("Should not be a valid number record", () => {
  const result = createExecutableSchema(yxc.record(yxc.number()))({
    a: 2,
    4: 5.5,
    s: "string",
  });
  expect(result.errors).to.have.length(1);
  expect(result.errors[0].key).to.deep.equal(["s"]);
});
