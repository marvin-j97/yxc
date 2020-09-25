export default (<[object, boolean][]>[
  [{ a: 2 }, true],
  [{ a: 2, b: 10 }, true],
  [{ a: -1, b: 5 }, true],
  [{ a: 2, b: 5, c: 7 }, true],
  [{ a: 10, b: -1 }, false],
  [{}, false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
