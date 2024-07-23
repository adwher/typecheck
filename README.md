# Typecheck

An extensible library for runtime type validation.

Provides type safety with static type inference. It offers a modular and
tree-shakable structure, allowing you to import only the components you need.
The API and codebase are clean, readable, and declarative, making it easy to
work with. Additionally, it includes useful utilities for parsing and modifying
data. The library comes with a variety of common types as schemas, along with
their modifiers. It also provides comprehensive code documentation with examples
and variants. Designed based on real use cases, it aims to enhance the developer
experience. The library is completely free and licensed under the MIT license.

## Features

- 🤖 Type safety with static type inference.
- 🏝️ Tree-shakable and modular structure from design, import only what you need.
- 🎧 Clean, readable and declarative API (and codebase).
- 🛠️ Useful utilities included to parse and modify.
- 👨‍💻 Most common types are included as schemas with their modifiers.
- 📕 Code documentation included (with examples of use and variants 👨‍💻).
- 🙉 Based on real use cases and designed to improve developer experience.

## Example

```ts
import * as k from "jsr:@adwher/typecheck";

const EmailSchema = k.pipe(k.string(), k.isEmail(), k.minLength(5));
```

## License

Completely free 🥳 and licensed under the [MIT license](./LICENSE).
