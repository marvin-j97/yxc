export default (<[string, [number, number], boolean][]>[
  ["", [1, 5], false],
  ["1", [1, 5], true],
  ["1234", [4, 5], true],
  ["7777", [1, 3], false],
  ["--", [0, 1], false],
]).map((tuple) => ({
  value: tuple[0],
  between: tuple[1],
  expected: tuple[2],
}));
