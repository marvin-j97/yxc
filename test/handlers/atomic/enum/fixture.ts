export default (<[any, any[], boolean][]>[
  ["", [25], false],
  ["", ["", 25], true],
  [{}, [{}, 25], false],
  [5, [1, 2, 3, 4, 25], false],
  ["4", [1, 2, 3, 4, 25], false],
  [5, [1, 2, 3, 4, 25, 5], true],
  [true, [0, 1], false],
  [true, [false, true], true],
  [null, [null, true], true],
  [null, [false, true], false],
  [undefined, [null, true], false],
  [undefined, [false, true], false],
  [undefined, [false, true, undefined], true],
]).map((tuple) => ({
  value: tuple[0],
  enum: tuple[1],
  expected: tuple[2],
}));
