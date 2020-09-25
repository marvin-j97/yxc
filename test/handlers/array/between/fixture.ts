export default (<[number[], [number, number], boolean][]>[
  [[], [1, 5], false],
  [[5], [1, 5], true],
  [[1, 2, 3, 4], [4, 5], true],
  [[1, 2, 3, 4], [1, 3], false],
]).map((tuple) => ({
  value: tuple[0],
  between: tuple[1],
  expected: tuple[2],
}));
