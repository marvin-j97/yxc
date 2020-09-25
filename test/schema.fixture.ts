export default (<[any, boolean][]>[
  [4, false],
  ["4", false],
  ["", false],
  [true, false],
  [null, false],
  [undefined, false],
  [{}, false],
  [[242], false],
  [NaN, false],
  [{ id: "asdasd" }, false],
  [{ id: "asdasd", firstName: "asd", lastName: "asd", age: "14" }, false],
  [{ id: "asdasd___", firstName: "asd", lastName: "asd", age: 14 }, false],
  [{ id: "asdasd", firstName: "asd", lastName: "asd", age: 14 }, false],
  [
    {
      id: "awoi56jabiow4j36oiwaj6b",
      firstName: "asd",
      lastName: "asd",
      age: 14,
    },
    true,
  ],
]).map((tuple) => ({
  value: tuple[0],
  valid: tuple[1],
}));
