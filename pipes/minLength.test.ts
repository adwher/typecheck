import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { minLength } from "./minLength.ts";
import { createContext } from "../context.ts";

const context = createContext();

Deno.test("assert arrays with fixed length", () => {
  const schema = pipe(array(number()), minLength(2));

  const correct = [[1, 2, 3], [3, 4, 5]];
  const incorrect = [[1, 2], [true, false, true, false], null, {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});

Deno.test("assert strings with fixed length", () => {
  const schema = pipe(string(), minLength(4));

  const correct = ["hello", "world"];
  const incorrect = ["hola", "bye", [1, 2, 3, 4, 5]];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
