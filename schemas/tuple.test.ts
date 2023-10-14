import {
  assertEquals,
  assertIsError,
  assertObjectMatch,
} from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";
import { tuple } from "./tuple.ts";

const context = createContext();

Deno.test("should pass a tuple values", () => {
  const schema = tuple(number(), number(), number());

  assertEquals(schema.check([1, 2, 3], context), [1, 2, 3]);
  assertEquals(schema.check([2, 4, 6], context), [2, 4, 6]);

  assertIsError(schema.check("", context), SchemaError);
  assertIsError(schema.check(false, context), SchemaError);
  assertIsError(schema.check(null, context), SchemaError);
  assertIsError(schema.check([], context), SchemaError);
});

Deno.test("should return an issue path correctly", () => {
  const schema = tuple(number(), number());

  const received = [false];
  const output = schema.check(received, context);

  assertIsError(output, SchemaError);
  assertObjectMatch(output.first(), { path: [0] });
});
