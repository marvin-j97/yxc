import yxc, { createSchema } from "../src/index";
import { expect } from "chai";

describe("Unions", () => {
  const validIdObjects = [
    {
      id: "5",
    },
    {
      id: 5,
    },
  ];

  const invalidIdObjects = [
    {
      id: "5",
      somethingelse: true,
    },
    {
      id: 5,
      somethingelse: true,
    },
    {
      id: 5.5,
    },
    {
      id: "test",
    },
  ];

  const schema = createSchema({
    id: yxc.union([yxc.string().numeric(), yxc.number().integer()]),
  });

  for (const valid of validIdObjects) {
    it("Should be a valid ID object", () => {
      expect(schema(valid).errors).to.have.length(0);
    });
  }

  for (const invalid of invalidIdObjects) {
    it("Should be a invalid ID object", () => {
      expect(schema(invalid).errors).to.have.length.greaterThan(0);
    });
  }
});
