export default (<[string, RegExp, boolean][]>[
  ["", /[0-9]{4}/, false],
  ["1", /[0-9]{4}/, false],
  ["1234", /[0-9]{4}/, true],
  ["7777", /[0-9]{4}/, true],
  ["7a77", /[0-9]{4}/, false],
  ["--", /[0-9]{4}/, false],
]).map((tuple) => ({
  value: tuple[0],
  regex: tuple[1],
  expected: tuple[2],
}));
