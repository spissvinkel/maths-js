# maths-js

A small TypeScript/JavaScript library of mathematical functions, mainly vector and matrix utilities.


## Documentation

[TSDoc API reference](https://spissvinkel.github.io/maths-js/api/)


## Installation

As an npm package:

```bash
$ npm install @spissvinkel/maths
```


## Sample usage

Create a file `sample.ts`:

```typescript
// import a module
import * as vec2 from '@spissvinkel/maths/vec2';

// initialize a new vector object
const v = vec2.of(1.0, 1.0);

// normalise the vector
vec2.norm(v);

// output the result
console.log(`v = [ ${v.x} ${v.y} ]`);
```

Compile to JavaScript using the [TypeScript](https://github.com/Microsoft/TypeScript) compiler:

```bash
$ tsc sample.ts
```

Bundle with e.g. [Google Closure Compiler](https://github.com/google/closure-compiler):

```bash
$ google-closure-compiler                        \
    --process_common_js_modules=true             \
    --module_resolution=NODE                     \
    --js=node_modules/@spissvinkel/maths/*.js    \
    --js=sample.js                               \
    --js_output_file=out.js
```

Run the bundled code to see the result:

```bash
$ node out.js

v = [ 0.7071067811865475 0.7071067811865475 ]
```
