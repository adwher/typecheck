import {
  assertIsError,
  assertObjectMatch,
  assertStrictEquals,
} from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, tuple } from "./mod.ts";

const context = createContext();

Deno.test("should assert with tuples", () => {
  const schema = tuple(number(), number());

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[1], [1, 2, 3], false, null, [], {}];

  for (const received of correct) {
    assertStrictEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test("should return an issue with the right path", () => {
  const schema = tuple(number(), number(), number());
  const output = schema.check([true, false, 0], context);

  assertIsError(output);
  assertObjectMatch(output.first(), { path: [0] });
});
