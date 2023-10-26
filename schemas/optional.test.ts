import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { boolean, optional } from "./mod.ts";

const context = createContext();

Deno.test(`should pass either wrapped or "undefined" values`, () => {
  const schema = optional(boolean());

  const correct = [true, false, undefined];
  const incorrect = ["hello", 1234, null, [], {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
