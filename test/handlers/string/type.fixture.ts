export default [
  ["", true],
  ["asdasdasd", true],
  ["15125125", true],
  ["qw4bqwb4qw4", true],
  [":AW_EW_EWA_%§", true],
  [null, false],
  [{}, false],
  [{ a: 2 }, false],
  [[2, 4, 56], false],
  [["dsad"], false],
  [undefined, false],
  [4, false],
  [5.4, false],
  [NaN, false],
].map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
