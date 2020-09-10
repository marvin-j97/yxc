export default (<[number, number, boolean][]>[
  [4, 4, true],
  [-4, -3, false],
  [0, 0.5, false],
  [5.4, 5, true],
]).map((tuple) => ({
  value: tuple[0],
  min: tuple[1],
  expected: tuple[2],
}));
