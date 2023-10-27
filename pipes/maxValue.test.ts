import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { maxValue } from "./maxValue.ts";

const context = createContext();
const schema = pipe(number(), maxValue(3));

Deno.test("should restrict the allowed numbers", () => {
  const correct = [0, 1, 2];
  const incorrect = [3, 4, 5];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
