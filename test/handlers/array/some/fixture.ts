export default (<[Array<any>, boolean][]>[
  [[2], true],
  [[2, 10], true],
  [[-1, 10], false],
  [[], false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
