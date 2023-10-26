import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { isNegative } from "./isNegative.ts";

const context = createContext();
const schema = pipe(number(), isNegative());

Deno.test("should assert negative numbers", () => {
  const correct = [-1, -10, -100_000];
  const incorrect = [1, 10, 100_000];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
