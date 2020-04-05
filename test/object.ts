import yxc, { createExecutableSchema } from "../src/index";
import { expect } from "chai";

export default () => {
  describe("Objects", () => {
    it("Should be a valid string", () => {
      expect(createExecutableSchema(yxc.object())({})).to.have.length(0);
    });

    const invalidObjects = [
      "str",
      4,
      true,
      null,
      undefined,
      false,
      [],
      () => {},
      { value: 4 },
    ];
    for (const value of invalidObjects) {
      it("Should not be a valid object", () => {
        expect(createExecutableSchema(yxc.object())(value)).to.have.length(1);
      });
    }

    it("Should be a valid object", () => {
      expect(
        createExecutableSchema(yxc.object().arbitrary())({
          value: 4,
          test: "string",
        })
      ).to.have.length(0);
    });

    {
      const person = () =>
        yxc.object({
          name: yxc.string(),
          age: yxc.number(),
        });
      const partial = person().partial();
      it("Should not be a valid instance of schema", () => {
        expect(
          createExecutableSchema(person())({ name: "name" })
        ).to.have.length.greaterThan(0);
      });

      it("Should be a valid instance of partial schema", () => {
        expect(
          createExecutableSchema(partial)({ name: "name" })
        ).to.have.length(0);
      });
    }

    it("Should handle arbitrary string->boolean dictionary (min length 1)", () => {
      const schema = createExecutableSchema(
        yxc
          .object()
          .arbitrary()
          .every((v) => typeof v == "boolean")
      );

      expect(schema({})).to.have.length(0);
      expect(schema({ hey: true, no: 4 })).to.have.length(1);
      expect(schema({ hey: true })).to.have.length(0);
    });
  });
};
