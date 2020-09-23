export default (<[string, boolean][]>[
  ["", false],
  ["1", true],
  ["1234", true],
  ["7777", true],
  ["7a77", true],
  ["--", true],
  ["       ", true],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
