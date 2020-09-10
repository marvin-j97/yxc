export default (<[number, boolean][]>[
  [4, false],
  [-4, true],
  [0, false],
  [5.4, false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
