import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { minLength } from "./minLength.ts";

const context = createContext();

Deno.test("should assert arrays with fixed length", () => {
  const schema = pipe(array(number()), minLength(2));

  const correct = [[1, 2, 3], [3, 4, 5]];
  const incorrect = [[1, 2], [true, false, true, false], null, {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test("should assert strings with fixed length", () => {
  const schema = pipe(string(), minLength(4));

  const correct = ["hello", "world"];
  const incorrect = ["hola", "bye", [1, 2, 3, 4, 5]];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
