import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { length } from "./length.ts";

const context = createContext();

Deno.test("should assert arrays with fixed length", () => {
  const schema = pipe(array(number()), length(2));

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[true, false], null, {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test("should assert strings with fixed length", () => {
  const schema = pipe(string(), length(5));

  const correct = ["hello", "world"];
  const incorrect = ["hola", "bye", [1, 2, 3, 4, 5]];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
