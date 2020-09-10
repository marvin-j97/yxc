export default [
  ["", 25, false],
  [25, 25, true],
  ["25", 25, false],
  [{}, {}, false],
  [true, false, false],
  [true, true, true],
].map((tuple) => ({
  value: tuple[0],
  eq: tuple[1],
  expected: tuple[2],
}));
