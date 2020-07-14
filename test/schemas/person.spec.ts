import yxc, { createExecutableSchema } from "../../src/index";
import { expect } from "chai";

export const Person = () =>
  yxc.object({
    firstName: yxc.string(),
    lastName: yxc.string(),
    age: yxc.number().integer().positive(),
    ssn: yxc.string().alphanum(),
    gender: yxc.number().enum([0, 1]).nullable(),
  });

describe("Person schema tests", () => {
  it("Should be a valid person", () => {
    const person = {
      firstName: "asd",
      lastName: "dsadasdad",
      age: 25,
      ssn: "ASASRBW5235325QWASD",
      gender: 0,
    };

    expect(Person().validate(person)).to.have.length(0);
    expect(createExecutableSchema(Person())(person)).to.have.length(0);
  });

  it("Should have invalid first name", () => {
    const person = {
      firstName: 4,
      lastName: "dsadasdad",
      age: 25,
      ssn: "ASASRBW5235325QWASD",
      gender: 0,
    };
    const result = createExecutableSchema(Person())(person);
    expect(result).to.have.length(1);
    expect(result[0].key).to.deep.equal(["firstName"]);
  });

  it("Should have invalid first name", () => {
    const person = {
      firstName: "asd",
      lastName: "dsadasdad",
      age: 25,
      ssn: "$ASASRBW5235325QWASD",
      gender: 2,
    };
    const result = createExecutableSchema(Person())(person);
    expect(result).to.have.length(2);
    expect(result[0].key).to.deep.equal(["ssn"]);
    expect(result[1].key).to.deep.equal(["gender"]);
  });
});
