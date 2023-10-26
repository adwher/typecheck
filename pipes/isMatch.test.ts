import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { isMatch } from "./isMatch.ts";

const context = createContext();
const schema = pipe(string(), isMatch(/[A-Z]{3}-\d{1,}/i));

Deno.test("should pass accepted values on the regular-expression", () => {
  const correct = ["ABC-123", "XYZ-456"];
  const incorrect = ["ABCD", "AB-1234"];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
