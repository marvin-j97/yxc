export default (<[Record<string, any>, number, boolean][]>[
  [{ a: 2 }, 0, false],
  [{ a: 2 }, 1, true],
  [{ a: 2 }, 2, false],
  [{ a: 2, b: 5 }, 2, true],
  [{ a: "test", b: 2 }, 2, true],
  [{ a: "test", b: 2 }, 1, false],
  [{}, 1, false],
  [{}, 0, true],
]).map((tuple) => ({
  value: tuple[0],
  numKeys: tuple[1],
  expected: tuple[2],
}));
