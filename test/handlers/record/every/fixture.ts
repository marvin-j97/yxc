export default (<[Record<string, any>, boolean][]>[
  [{ a: 2 }, true],
  [{ a: 2, b: 5 }, true],
  [{ a: 2, b: 11 }, false],
  [{ a: 50, b: 11 }, false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
