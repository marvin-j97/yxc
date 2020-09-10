export default (<[string, string, boolean][]>[
  ["test string", "test", false],
  ["test string", "string", true],
  ["test string", "asd", false],
  ["test string", "t", false],
  ["test string", "", true],
  ["test string", "g", true],
]).map((tuple) => ({
  value: tuple[0],
  suffix: tuple[1],
  expected: tuple[2],
}));
