import yxc from "../src/index";
import { expect } from "chai";

export default () => {
  describe("Strings", () => {
    const validStrings = ["a string", ""];
    for (const string of validStrings) {
      it("Should be a valid string", () => {
        expect(yxc.string().validate(string)).to.have.length(0);
      });
    }

    const invalidStrings = [4, true, null, undefined, false, [], {}, () => {}];
    for (const value of invalidStrings) {
      it("Should not be a valid string", () => {
        expect(yxc.string().validate(value)).to.have.length(1);
      });
    }

    describe("Extra rules", () => {
      {
        const handler = yxc.string().notEmpty();
        it("Valid non-empty string", () => {
          expect(handler.validate("abc")).to.have.length(0);
        });
        it("Invalid non-empty string", () => {
          expect(handler.validate("")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().len(4);
        it("Valid string with exact length", () => {
          expect(handler.validate("aaad")).to.have.length(0);
        });
        it("Invalid string with exact length", () => {
          expect(handler.validate("aaadx")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().min(4);
        it("Valid string with min length", () => {
          expect(handler.validate("aaad")).to.have.length(0);
        });
        it("Invalid string with min length", () => {
          expect(handler.validate("aaa")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().max(4);
        it("Valid string with max length", () => {
          expect(handler.validate("aaad")).to.have.length(0);
        });
        it("Invalid string with max length", () => {
          expect(handler.validate("aaaasd")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().between(4, 8);
        it("Valid string between length", () => {
          expect(handler.validate("aaadg")).to.have.length(0);
        });
        it("Invalid string between length", () => {
          expect(handler.validate("asd")).to.have.length(1);
        });
        it("Invalid string between length", () => {
          expect(handler.validate("asdasdasdasdasd")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().match(/\d{4}.\d{2}.\d{2}/);
        it("Valid string with regex", () => {
          expect(handler.validate("2017.09.03")).to.have.length(0);
        });
        it("Invalid string with regex", () => {
          expect(handler.validate("dasdasd")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().use((s) => s.startsWith("pls"));
        it("Valid string with custom function", () => {
          expect(handler.validate("pls star and fork")).to.have.length(0);
        });
        it("Invalid string with custom function", () => {
          expect(handler.validate("dasdasd")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().enum(["y", "x", "c"]);
        it("Valid string with enum", () => {
          expect(handler.validate("y")).to.have.length(0);
          expect(handler.validate("x")).to.have.length(0);
          expect(handler.validate("c")).to.have.length(0);
        });
        it("Invalid string with enum", () => {
          expect(handler.validate("a")).to.have.length(1);
          expect(handler.validate("yxc")).to.have.length(1);
          expect(handler.validate("yy")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().alphanum();
        it("Valid string (alphanum)", () => {
          expect(handler.validate("yyyya")).to.have.length(0);
          expect(handler.validate("2452x")).to.have.length(0);
          expect(handler.validate("1242")).to.have.length(0);
        });
        it("Invalid string (alphanum)", () => {
          expect(handler.validate("a%")).to.have.length(1);
          expect(handler.validate("yxc-")).to.have.length(1);
          expect(handler.validate("y y")).to.have.length(1);
        });
      }

      {
        const handler = yxc.string().alphanum(true);
        it("Valid string (alphanum with spaces)", () => {
          expect(handler.validate("yy yya")).to.have.length(0);
          expect(handler.validate("2452x")).to.have.length(0);
          expect(handler.validate("12 42")).to.have.length(0);
          expect(handler.validate("y y")).to.have.length(0);
        });
        it("Invalid string (alphanum with spaces)", () => {
          expect(handler.validate("a%")).to.have.length(1);
          expect(handler.validate("yxc-")).to.have.length(1);
        });
      }
    });
  });
};
