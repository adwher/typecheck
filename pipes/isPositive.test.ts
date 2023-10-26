import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { number, pipe } from "../schemas/mod.ts";
import { createContext } from "../context.ts";

import { isPositive } from "./isPositive.ts";

const context = createContext();
const schema = pipe(number(), isPositive());

Deno.test("assert negative numbers", () => {
  const correct = [1, 10, 100_000];
  const incorrect = [-1, -10, -100_000];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
