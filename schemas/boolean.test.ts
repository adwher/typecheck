import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { boolean } from "./mod.ts";

const context = createContext();
const schema = boolean();

Deno.test("should assert with booleans", () => {
  const correct = [true, false];
  const incorrect = ["hello", 1234, null, [], {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
