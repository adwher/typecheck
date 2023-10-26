import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { minValue } from "./minValue.ts";

const context = createContext();
const schema = pipe(number(), minValue(2));

Deno.test("restrict the allowed numbers", () => {
  const correct = [3, 4, 5];
  const incorrect = [0, 1, 2];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
