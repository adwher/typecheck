import {
  assertEquals,
  assertIsError,
  assertObjectMatch,
} from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { array, number } from "./mod.ts";

const context = createContext();
const schema = array(number());

Deno.test("should assert with arrays", () => {
  const correct = [[1, 2], [10_000, 20_000]];
  const incorrect = [[1, false], [true, false], ["hello", "world"]];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test("should return an issue with the right path", () => {
  const output = schema.check([1, 2, false], context);

  assertIsError(output);
  assertObjectMatch(output.first(), { path: [2] });
});
