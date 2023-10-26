import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { literal } from "./literal.ts";

const context = createContext();
const schema = literal("hello");

Deno.test("pass allowed values", () => {
  const incorrect = ["bye", 1234, undefined, [], {}];

  assertEquals(schema.check("hello", context), "hello");

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
