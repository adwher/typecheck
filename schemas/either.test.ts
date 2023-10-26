import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";

import { either } from "./either.ts";
import { string } from "./string.ts";
import { number } from "./number.ts";
import { boolean } from "./boolean.ts";

const context = createContext();
const schema = either(either(string(), number()), boolean());

Deno.test("pass allowed values", () => {
  const correct: unknown[] = ["hello", "world", 1234, true, false];
  const incorrect = [null, {}, []];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
