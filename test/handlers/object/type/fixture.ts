export default (<[string, boolean][]>[
  [{}, true],
  [{ c: 25 }, false],
  [{ a: 25 }, true],
  [{ a: "25" }, false],
  [{ a: 25,  b: "str" }, true],
  [{ a: 25,  b: 5 }, false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
