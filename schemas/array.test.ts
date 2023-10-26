import {
  assertEquals,
  assertIsError,
  assertObjectMatch,
} from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { array } from "./array.ts";
import { number } from "./number.ts";

const context = createContext();
const schema = array(number());

Deno.test("pass array values", () => {
  const correct = [[1, 2], [10_000, 20_000]];
  const incorrect = [[1, false], [true, false], ["hello", "world"]];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});

Deno.test("return an issue path correctly", () => {
  const output = schema.check([1, 2, false], context);

  assertIsError(output);
  assertObjectMatch(output.first(), { path: [2] });
});
