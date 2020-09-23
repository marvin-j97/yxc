export default (<[number, number, boolean][]>[
  [4, 4, true],
  [-4, -3, true],
  [0, 0.5, true],
  [5.4, 5, false],
]).map((tuple) => ({
  value: tuple[0],
  max: tuple[1],
  expected: tuple[2],
}));
