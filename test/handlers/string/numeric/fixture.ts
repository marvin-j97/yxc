export default (<[string, boolean][]>[
  ["", false],
  ["2", true],
  ["wrqwrqwr2525252", false],
  ["523525asdasd", false],
  ["asdasdasd", false],
  ["15125125", true],
  ["qw4bqwb4qw4", false],
  [":AW_EW_EWA_%§", false],
  [["dsad"], false],
]).map((tuple) => ({
  value: tuple[0],
  expected: tuple[1],
}));
