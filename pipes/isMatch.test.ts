import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { isMatch } from "./isMatch.ts";

const context = createContext();
const schema = pipe(string(), isMatch(/[A-Z]{3}-\d{1,}/i));

Deno.test("pass accepted values on the regular-expression", () => {
  const correct = ["ABC-123", "XYZ-456"];
  const incorrect = ["ABCD", "AB-1234"];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
