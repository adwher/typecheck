import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { startsWith } from "./startsWith.ts";

const context = createContext();

Deno.test("should starts with the specified search", () => {
  const schema = pipe(string(), startsWith("abc"));

  const correct = [`abc`, `abc123`, `abcd`, `abcd123`];
  const incorrect = [``, `ab`, `ac`, `abC`, `ABC`, `a1234`];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
