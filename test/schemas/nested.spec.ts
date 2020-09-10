import yxc, { createExecutableSchema } from "../../src/index";
import { expect } from "chai";

export const Test = () =>
  yxc.object({
    layer0: yxc.object({
      layer1: yxc.object({
        layer2: yxc.object({
          layer3: yxc.object({
            value: yxc.number(),
          }),
        }),
      }),
    }),
  });

export const ArrayTest = () =>
  yxc.object({
    value: yxc.array(yxc.array(yxc.array(yxc.boolean()))),
  });

describe("Nested tests", () => {
  it("Should have missing deep property", () => {
    const result = createExecutableSchema(Test())({});
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["layer0"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(Test())({ layer0: 4 });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["layer0"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(Test())({ layer0: { layer1: {} } });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["layer0", "layer1", "layer2"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(Test())({
      layer0: { layer1: { layer2: { layer3: {} } } },
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal([
      "layer0",
      "layer1",
      "layer2",
      "layer3",
      "value",
    ]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(Test())({
      layer0: { layer1: { layer2: { layer3: { value: "str" } } } },
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal([
      "layer0",
      "layer1",
      "layer2",
      "layer3",
      "value",
    ]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(Test())({
      layer0: { layer1: { layer2: { layer3: { value: 5 } } } },
    });
    expect(result.errors).to.have.length(0);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: {},
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["value"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: [4],
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["value", "0"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: [[4]],
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["value", "0", "0"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: [[[4]]],
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["value", "0", "0", "0"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: [[[]]],
    });
    expect(result.errors).to.have.length(0);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: [[[[]]]],
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["value", "0", "0", "0"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: [[[true, false, true, "string"]]],
    });
    expect(result.errors).to.have.length(1);
    expect(result.errors[0].key).to.deep.equal(["value", "0", "0", "3"]);
  });

  it("Should have missing deep property", () => {
    const result = createExecutableSchema(ArrayTest())({
      value: [[[true, false, true]]],
    });
    expect(result.errors).to.have.length(0);
  });
});
