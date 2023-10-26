import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { string } from "./string.ts";

const context = createContext();

Deno.test("pass string values", () => {
  const schema = string();

  const correct = [`hello`, `hola`];
  const incorrect = [1234, true, false, null, [], {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
