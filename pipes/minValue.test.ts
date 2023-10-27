import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { minValue } from "./minValue.ts";

const context = createContext();
const schema = pipe(number(), minValue(2));

Deno.test("should restrict the allowed numbers", () => {
  const correct = [3, 4, 5];
  const incorrect = [0, 1, 2];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
