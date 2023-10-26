import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { length } from "./length.ts";
import { createContext } from "../context.ts";

const context = createContext();

Deno.test("assert arrays with fixed length", () => {
  const schema = pipe(array(number()), length(2));

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[true, false], null, {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});

Deno.test("assert strings with fixed length", () => {
  const schema = pipe(string(), length(5));

  const correct = ["hello", "world"];
  const incorrect = ["hola", "bye", [1, 2, 3, 4, 5]];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
