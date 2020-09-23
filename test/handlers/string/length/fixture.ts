export default (<[string, number, boolean][]>[
  ["", 0, true],
  ["", 1, false],
  ["1", 0, false],
  ["1", 1, true],
  ["1234", 4, true],
  ["7777", 3, false],
  ["7a77", 7, false],
  ["--", 5.2, false],
]).map((tuple) => ({
  value: tuple[0],
  length: tuple[1],
  expected: tuple[2],
}));
