export default (<[Array<any>, boolean][]>[
  [[2], true],
  [[2, 10], false],
  [[-1, 10], false],
  [[2, 3, 4], true],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
