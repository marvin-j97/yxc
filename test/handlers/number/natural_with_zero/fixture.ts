export default (<[number, boolean][]>[
  [4, true],
  [-4, false],
  [0, true],
  [5.4, false],
  [1512, true],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
