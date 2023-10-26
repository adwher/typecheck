import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { boolean, either, number, string } from "./mod.ts";

const context = createContext();

Deno.test("should assert with the given schemas", () => {
  const schema = either(string(), number());

  const correct: unknown[] = ["hello", "world", 1234, 0.25];
  const incorrect = [true, false, null, {}, []];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test("should assert with nested schemas", () => {
  const schema = either(either(string(), number()), boolean());

  const correct: unknown[] = ["hello", "world", 1234, true, false];
  const incorrect = [null, {}, []];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
