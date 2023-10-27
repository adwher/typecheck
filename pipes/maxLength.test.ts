import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { maxLength } from "./maxLength.ts";

const context = createContext();

Deno.test("should assert arrays with fixed length", () => {
  const schema = pipe(array(number()), maxLength(3));

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[1, 2, 3], [true, false], null, {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test("should assert strings with fixed length", () => {
  const schema = pipe(string(), maxLength(5));

  const correct = ["hola", "bye"];
  const incorrect = ["hello", "world", [1, 2, 3, 4]];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
