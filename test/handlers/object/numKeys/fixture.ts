export default (<[string, number, boolean][]>[
  [{}, 0, true],
  [{}, 5, false],
  [{ a: 2 }, 1, true],
  [{ a: "test" }, 0, false],
  [{ a: "test", b: 2 }, 2, true],
]).map((tuple) => ({
  value: tuple[0],
  numKeys: tuple[1],
  expected: tuple[2],
}));
