import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { boolean } from "./boolean.ts";
import { optional } from "./optional.ts";

const context = createContext();
const schema = optional(boolean());

Deno.test(`pass either wrapped or "undefined" values`, () => {
  const correct = [true, false, undefined];
  const incorrect = ["hello", 1234, null, [], {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
