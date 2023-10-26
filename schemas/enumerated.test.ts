import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";

import { enumerated } from "./enumerated.ts";

const context = createContext();
const schema = enumerated("hello", "hola", "hallo");

Deno.test("pass allowed values", () => {
  const correct: unknown[] = ["hello", "hola", "hallo"];
  const incorrect = ["bye", "adios", 1234, null, true, false, [], {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
