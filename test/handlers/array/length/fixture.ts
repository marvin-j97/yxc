export default (<[Array<any>, number, boolean][]>[
  [[2], 0, false],
  [[2], 1, true],
  [[2], 2, false],
  [[2, 4], 2, true],
  [[2, 4], 1, false],
  [[], 1, false],
  [[], 0, true],
]).map((tuple) => ({
  value: tuple[0],
  length: tuple[1],
  expected: tuple[2],
}));
