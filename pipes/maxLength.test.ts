import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { maxLength } from "./maxLength.ts";
import { createContext } from "../context.ts";

const context = createContext();

Deno.test("assert arrays with fixed length", () => {
  const schema = pipe(array(number()), maxLength(3));

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[1, 2, 3], [true, false], null, {}];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});

Deno.test("assert strings with fixed length", () => {
  const schema = pipe(string(), maxLength(5));

  const correct = ["hola", "bye"];
  const incorrect = ["hello", "world", [1, 2, 3, 4]];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
