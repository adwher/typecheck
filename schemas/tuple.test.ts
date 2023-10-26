import {
  assertIsError,
  assertObjectMatch,
  assertStrictEquals,
} from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { number } from "./number.ts";

import { tuple } from "./tuple.ts";

const context = createContext();
const schema = tuple(number(), number(), number());

Deno.test("pass a tuple values", () => {
  const correct = [[1, 2, 3], [2, 4, 6]];
  const incorrect = [[1, 2], false, null, [], {}];

  for (const url of correct) {
    assertStrictEquals(schema.check(url, context), url);
  }

  for (const url of incorrect) {
    assertIsError(schema.check(url, context));
  }
});

Deno.test("return an issue path correctly", () => {
  const output = schema.check([true, false], context);

  assertIsError(output);
  assertObjectMatch(output.first(), { path: [0] });
});
