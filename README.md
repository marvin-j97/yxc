[![npm version](https://badge.fury.io/js/%40dotvirus%2Fyxc.svg)](https://badge.fury.io/js/%40dotvirus%2Fyxc)
![Node.js CI](https://github.com/dotvirus/yxc/workflows/Node.js%20CI/badge.svg)

# yxc

Schema validation with composition &amp; API middlewares

```
npm i @dotvirus/yxc
```

# Create & validate a schema

```typescript
import yxc, { createSchema } from "@dotvirus/yxc";
// or const yxc = require("@dotvirus/yxc").default;
//    const { createSchema } = require("@dotvirus/yxc");

// Create a schema using the createSchema utility
// Prefer using functions to avoid having global state
// Properties are *required* by default, unless specified otherwise (.optional(), .nullable())
const Album = () =>
  createSchema({
    title: yxc.string(),
    artist: yxc.string(),
    songCount: yxc.number().min(1),
    releaseYear: yxc.number().nullable(),
    genres: yxc.array(yxc.string().max(30)),
  });

// Our object to validate
const faith = {
  title: "Faith",
  artist: "The Cure",
  songCount: 8,
  releaseYear: 1981,
  genres: ["Post punk", "Gothic rock"],
};

{
  // createSchema returns a function to validate anything with
  // The result is an array of invalid properties in the input
  // If the result array is empty, the object is a valid instance of the provided schema
  const result = Album()(faith);
  console.log(result); // -> []
}

{
  const result = Album()({ name: "Invalid" });
  console.log(result);
  // [
  //   { key: [ 'name' ], message: 'Value not allowed' },
  //   { key: [ 'title' ], message: 'Value required' },
  //   { key: [ 'artist' ], message: 'Value required' },
  //   { key: [ 'songCount' ], message: 'Value required' },
  //   { key: [ 'releaseYear' ], message: 'Value required' },
  //   { key: [ 'genres' ], message: 'Value required' }
  // ]
}
```

# Handlers

#### yxc.object(/_ keys? _/):

Require an object - the object constructor can receive a dictionary of yxc handlers to check keys with.

#### yxc.string:

Require a string

#### yxc.number:

Require a number, add .integer() for integers only

#### yxc.boolean:

Require a boolean

#### yxc.array(handler!):

Require an array - the array constructor requires a handler that describes what the array contains

#### yxc.any()

Require something - use .use() to narrow down what this value should be

# Custom functions

```typescript
const prefix = (prefix: string) => (str: string) => str.startsWith(prefix);

// Require 'description' to start with 'Hello! '
const MySchema = () =>
  yxc.object({
    description: yxc.string().use(prefix("Hello! ")),
  });
```

# Schema composition

```typescript
// Create a validation handler
// Note that this does not return a function,
// so it can be used in another schema to compose more complex schemas
const Song = () =>
  yxc.object({
    name: yxc.string().notEmpty(),
    titleTrack: {
      handler: yxc.boolean(),
      default: () => false,
    },
    duration: yxc.number().min(1),
  });

// If you really wanted to validate a single song, use:
const songValidator = createExecutableSchema(Song());
// This creates/curries a function you can validate your input with.
console.log(songValidator({ name: "My song" })); // -> not valid

// createSchema(schema) is a shortcut for createExecutableSchema(yxc.object(schema))

// Compose the Album schema with "tracklist" being an array of Songs
const Album = () =>
  createSchema({
    title: yxc.string(),
    artist: yxc.string(),
    tracklist: yxc.array(Song()).notEmpty(),
    releaseYear: yxc.number().nullable(),
    genres: yxc.array(yxc.string()),
  });

{
  const result = Album()({
    title: "Faith",
    artist: "The Cure",
    tracklist: [],
    releaseYear: 1981,
    genres: ["Post punk", "Gothic rock"],
  });
  console.log(result); // -> [ { key: [ 'tracklist' ], message: 'Must not be empty' } ]
}

{
  const faith = {
    title: "Faith",
    artist: "The Cure",
    tracklist: [
      {
        name: "The Holy Hour",
        duration: 123,
      },
      {
        name: "Primary",
        duration: 123,
      },
      {
        name: "Other Voices",
        duration: 123,
      },
      {
        name: "All Cats Are Grey",
        duration: 123,
      },
      {
        name: "The Funeral Party",
        duration: 123,
      },
      {
        name: "Doubt",
        duration: 123,
      },
      {
        name: "The Drowning Man",
        duration: 123,
      },
      {
        name: "Faith",
        titleTrack: true,
        duration: 123,
      },
    ],
    releaseYear: 1981,
    genres: ["Post punk", "Gothic rock"],
  };
  const result = Album()(faith);
  console.log(result); // -> [] -- Valid!
  console.log(faith.tracklist.find((t) => t.titleTrack).name); // -> "Faith"
  // All the other songs have titleTrack = false, even though they were never provided originally
  // Note that default values and mutations should be used with care as they mutate the input state
}
```

# Format result

```typescript
// Let's take another look at the result array.
// Take the example schemas from above:

const result = Album()({
  title: "Faith",
  artist: "The Cure",
  tracklist: [
    {
      name: "The Holy Hour",
    },
    {
      name: "Primary",
    },
    {
      name: "Other Voices",
    },
    {
      name: "All Cats Are Grey",
    },
    {
      name: "The Funeral Party",
    },
    {
      name: "Doubt",
    },
    {
      name: "The Drowning Man",
    },
    {
      name: "Faith",
      titleTrack: true,
    },
  ],
  releaseYear: 1981,
  genres: ["Post punk", "Gothic rock"],
});
console.log(result);
// [
//   { key: [ 'tracklist', '0', 'duration' ], message: 'Value required' },
//   { key: [ 'tracklist', '1', 'duration' ], message: 'Value required' },
//   { key: [ 'tracklist', '2', 'duration' ], message: 'Value required' },
//   { key: [ 'tracklist', '3', 'duration' ], message: 'Value required' },
//   { key: [ 'tracklist', '4', 'duration' ], message: 'Value required' },
//   { key: [ 'tracklist', '5', 'duration' ], message: 'Value required' },
//   { key: [ 'tracklist', '6', 'duration' ], message: 'Value required' },
//  { key: [ 'tracklist', '7', 'duration' ], message: 'Value required' }
// ]
// Yikes, we forgot the durations. This is also getting pretty messy.
// However, there is an utility function to format the result array:

import { formatResult } from "@dotvirus/yxc";
console.log(formatResult(result));
// [
//   'tracklist.0.duration: Value required',
//   'tracklist.1.duration: Value required',
//   'tracklist.2.duration: Value required',
//   'tracklist.3.duration: Value required',
//   'tracklist.4.duration: Value required',
//   'tracklist.5.duration: Value required',
//   'tracklist.6.duration: Value required',
//   'tracklist.7.duration: Value required'
// ]
```

# Use as Express/connect middleware

```typescript
import { connect } from "@dotvirus/yxc";

const app = express();

app.post("/song", connect({ body: Song() }), createSong);
```

### Custom error handler

By default, on validation fail, the middleware calls next(400).
This can be adjusted using a custom error formatter as the 2nd argument.
The input is the validation result array.

```typescript
import { connect } from "@dotvirus/yxc";

const app = express();

app.post(
  "/song",
  connect({ body: Song() }, (result) => "Bad request!"),
  createSong
);
// -> Calls next("Bad request!") on validation fail
```
