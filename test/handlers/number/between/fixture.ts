export default (<[number, [number, number], boolean][]>[
  [4, [0, 4], true],
  [-4, [-10, -5], false],
  [0, [1, 10], false],
  [5.4, [2, 10], true],
]).map((tuple) => ({
  value: tuple[0],
  between: tuple[1],
  expected: tuple[2],
}));
