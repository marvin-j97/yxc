# yxc

Schema validation with composition, written in Typescript.

See the full documentation here: https://marvin-j97.github.io/yxc/

[![npm version](https://badge.fury.io/js/%40dotvirus%2Fyxc.svg)](https://badge.fury.io/js/%40dotvirus%2Fyxc)
![Node.js CI](https://github.com/marvin-j97/yxc/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/marvin-j97/yxc/branch/dev/graph/badge.svg)](https://codecov.io/gh/dotvirus/yxc)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@dotvirus/yxc)
![David](https://img.shields.io/david/dotvirus/yxc)
![npm](https://img.shields.io/npm/dw/@dotvirus/yxc)

# Install

```
npm i @dotvirus/yxc
```

# Examples

Validate a schema

```typescript
import yxc, { createSchema } from "@dotvirus/yxc";

const schema = createSchema({
  id: yxc.number().integer().positive(),
  name: yxc.string().notEmpty(),
  age: yxc.number().integer().min(0),
});

const result = schema({
  id: 52165,
  name: "Test Name",
  age: 32,
});
console.log(result);
//
// {
//   ok: true,
//   errors: []
// }
//

const result = schema({
  id: 52165,
  name: "Test Name",
  age: -5,
});
console.log(result);
//
// {
//   ok: false,
//   errors: [
//     {
//       key: ['age'],
//       message: 'Must be at least 0'
//     }
//   ]
// }
//
```

Validate a union type

```typescript
import yxc, { createExecutableSchema } from "@dotvirus/yxc";

const numberStringUnion = yxc.union([yxc.string(), yxc.number()]);

const isStringOrNumber = createExecutableSchema(numberStringUnion);

console.log(isStringOrNumber(5).ok); // -> true
console.log(isStringOrNumber("5").ok); // -> true
console.log(isStringOrNumber(null).ok); // -> false
```

Composition

```typescript
import yxc, { createExecutableSchema } from "@dotvirus/yxc";

const Song = yxc.object({
  title: yxc.string().notEmpty(),
  duration: yxc.number().positive().int(),
});

const Album = yxc.object({
  title: yxc.string().notEmpty(),
  songs: yxc.array(Song).notEmpty(),
  duration: yxc.number().positive().int(),
  releaseYear: yxc.number().positive().int(),
});

const isAlbum = createExecutableSchema(Album);

console.log(
  isAlbum({
    title: "Some album",
    songs: [
      {
        title: "Some song",
        duration: 125,
      },
    ],
    duration: 125,
    releaseYear: 2015,
  }).ok,
); // -> true

console.log(
  isAlbum({
    title: "Some album",
    songs: [],
    duration: 125,
    releaseYear: 2015,
  }).errors,
);
//
// [
//   {
//     key: ['songs'],
//     message: 'Must not be empty'
//   }
// ]
//
```

Infer a schema type (Typescript only!)

| `NOTE` | Turn on 'strictNullChecks' in your tsconfig.json, otherwise values may not be inferred correctly. |
| ------ | ------------------------------------------------------------------------------------------------- |

```typescript
import yxc, { Infer } from "@dotvirus/yxc";

const songSchema = yxc.object({
  title: yxc.string().notEmpty(),
  duration: yxc.number().positive().int(),
  rating: yxc.number().positive().int().nullable(),
});

type Song = Infer<typeof songSchema>;
//
// type Song = {
//   title: string;
//   duration: number;
//   rating: number | null;
// }
//
```
