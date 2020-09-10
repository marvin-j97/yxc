export default (<[string, string, boolean][]>[
  ["test string", "test", true],
  ["test string", "string", false],
  ["test string", "asd", false],
  ["test string", "t", true],
  ["test string", "", true],
]).map((tuple) => ({
  value: tuple[0],
  prefix: tuple[1],
  expected: tuple[2],
}));
