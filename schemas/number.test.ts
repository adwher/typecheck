import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number } from "./mod.ts";

const context = createContext();

Deno.test("assert number values", () => {
  const schema = number();

  const correct: unknown[] = [123, -123, 10_000, 0.1];
  const incorrect = ["hello", null, true, false, [], {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
