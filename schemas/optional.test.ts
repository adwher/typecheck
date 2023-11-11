import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { boolean, optional, string } from "./mod.ts";

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

Deno.test(`should use the fallback`, () => {
  const schema = optional(string(), "hello");

  assertEquals(schema.check(undefined, context), "hello");
  assertEquals(schema.check("world", context), "world");
});
