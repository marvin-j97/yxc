export default (<[object, boolean][]>[
  [{}, true],
  [{ a: 2 }, true],
  [{ a: 2, b: 10 }, false],
  [{ a: -1, b: 5 }, false],
  [{ a: 2, b: 5, c: 7 }, true],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
