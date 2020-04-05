import yxc, { createExecutableSchema } from "../../src/index";
import { expect } from "chai";

export const Physical = () =>
  yxc.object({
    format: yxc.string().enum(["Vinyl", "CD"]),
    quantity: {
      handler: yxc.number().nullable(),
      default: () => null,
    },
    extras: {
      handler: yxc.array(
        yxc.object({
          description: yxc.string(),
        })
      ),
      default: () => [],
    },
  });

export const Song = () =>
  yxc.object({
    name: yxc.string(),
    author: yxc.string().nullable(),
    albumName: yxc.string().nullable(),
    duration: yxc.number(),
    releaseDate: {
      handler: yxc
        .string()
        .regex(/\d{4}.\d{2}.\d{2}/)
        .nullable(),
      default: () => null,
    },
    physicals: {
      handler: yxc.array(Physical()),
      default: () => [],
    },
  });

export default () => {
  describe("Music schema tests", () => {
    it("Should be a valid song", () => {
      const song = {
        name: "Song 3",
        author: null,
        albumName: "The album",
        duration: 123,
      };
      expect(createExecutableSchema(Song())(song)).to.have.length(0);
      // @ts-ignore
      expect(song.releaseDate).to.be.null;
      // @ts-ignore
      expect(song.physicals).to.be.an("array");
      // @ts-ignore
      expect(song.physicals).to.have.length(0);
    });

    it("Complex schema example", () => {
      const song = {
        name: "Song 4",
        author: null,
        albumName: "The album 2",
        duration: 123,
        physicals: [
          {
            format: "CD",
          },
          {
            format: "Vinyl",
            quantity: 5000,
          },
          {
            format: "Tape",
            quantity: 5000,
            extras: [
              {
                description: "Something really cool",
              },
              {
                name: "This is invalid",
              },
            ],
          },
        ],
      };
      const result = createExecutableSchema(Song())(song);
      expect(result).to.have.length(3);
      expect(result[0].key).to.deep.equal(["physicals", "2", "format"]);
      expect(result[1].key).to.deep.equal([
        "physicals",
        "2",
        "extras",
        "1",
        "name",
      ]);
      expect(result[2].key).to.deep.equal([
        "physicals",
        "2",
        "extras",
        "1",
        "description",
      ]);
      // @ts-ignore
      expect(song.physicals[0].quantity).to.be.null;
      expect(song.physicals[1].quantity).to.be.equal(5000);
      // @ts-ignore
      expect(song.physicals[0].extras).to.deep.equal([]);
      // @ts-ignore
      expect(song.physicals[1].extras).to.deep.equal([]);
    });
  });
};
