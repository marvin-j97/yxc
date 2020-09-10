export default (<[Array<any>, boolean][]>[
  [[2], true],
  [[2], true],
  [[2], true],
  [[2, 4], true],
  [[2, 4], true],
  [[], false],
  [[], false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
