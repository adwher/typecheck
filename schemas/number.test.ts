import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { number } from "./number.ts";

const context = createContext();
const schema = number();

Deno.test("pass number values", () => {
  const correct: unknown[] = [123, -123, 10_000, 0.1];
  const incorrect = ["hello", null, true, false, [], {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
