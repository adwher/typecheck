import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { literal } from "./mod.ts";

const context = createContext();

Deno.test("should assert with the given literal", () => {
  const schema = literal("hello");
  const incorrect = ["bye", 1234, undefined, [], {}];

  // Yep, only one schema be allowed
  assertEquals(schema.check("hello", context), "hello");

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
