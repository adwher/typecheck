import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { maxValue } from "./maxValue.ts";

const context = createContext();
const schema = pipe(number(), maxValue(3));

Deno.test("restrict the allowed numbers", () => {
  const correct = [0, 1, 2];
  const incorrect = [3, 4, 5];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
