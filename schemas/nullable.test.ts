import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { boolean, nullable, string } from "./mod.ts";

const context = createContext();

Deno.test(`should pass either wrapped or "null" values`, () => {
  const schema = nullable(boolean());

  const correct = [true, false, null];
  const incorrect = ["hello", 1234, undefined, [], {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test(`should use the fallback`, () => {
  const schema = nullable(string(), "hello");

  assertEquals(schema.check(null, context), "hello");
  assertEquals(schema.check("world", context), "world");
});
