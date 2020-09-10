export default (<[number, boolean][]>[
  [4, true],
  [-4, false],
  [0, false],
  [5.4, true],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
