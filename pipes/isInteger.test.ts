import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { number, pipe } from "../schemas/mod.ts";
import { createContext } from "../context.ts";

import { isInteger } from "./isInteger.ts";

const context = createContext();
const schema = pipe(number(), isInteger());

Deno.test("assert integer numbers", () => {
  const correct = [1, -1, 100_000];
  const incorrect = [1.23, 0.12, 0.1 + 0.2];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
