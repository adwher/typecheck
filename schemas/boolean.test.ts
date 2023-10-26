import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { boolean } from "./boolean.ts";

const context = createContext();
const schema = boolean();

Deno.test("pass boolean values", () => {
  const correct = [true, false];
  const incorrect = ["hello", 1234, null, [], {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
