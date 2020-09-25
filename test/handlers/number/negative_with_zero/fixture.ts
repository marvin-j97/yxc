export default (<[number, boolean][]>[
  [4, false],
  [-4, true],
  [0, true],
  [5.4, false],
  [1512, false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
