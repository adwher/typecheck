import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { string } from "./mod.ts";

const context = createContext();

Deno.test("should assert with strings", () => {
  const schema = string();

  const correct = [`hello`, `hola`];
  const incorrect = [1234, true, false, null, [], {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
