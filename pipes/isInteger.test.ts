import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { isInteger } from "./isInteger.ts";

const context = createContext();
const schema = pipe(number(), isInteger());

Deno.test("should assert integer numbers", () => {
  const correct = [1, -1, 100_000];
  const incorrect = [1.23, 0.12, 0.1 + 0.2];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
