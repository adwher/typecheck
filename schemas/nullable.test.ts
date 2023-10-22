import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { boolean } from "./boolean.ts";
import { nullable } from "./nullable.ts";

const context = createContext();
const schema = nullable(boolean());

Deno.test(`should pass either wrapped or "null" values`, () => {
  const correct = [true, false, null];
  const incorrect = ["hello", 1234, undefined, [], {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
