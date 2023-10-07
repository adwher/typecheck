import {
  assertEquals,
  assertInstanceOf,
  assertObjectMatch,
} from "std/assert/mod.ts";

import { SchemaContext } from "../context.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";
import { tuple } from "./tuple.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass a simple tuple", () => {
  const schema = tuple(number(), number(), number());

  assertEquals(schema.check([1, 2, 3], context), [1, 2, 3]);
  assertEquals(schema.check([2, 4, 6], context), [2, 4, 6]);

  assertInstanceOf(schema.check("", context), SchemaError);
  assertInstanceOf(schema.check(false, context), SchemaError);
  assertInstanceOf(schema.check(null, context), SchemaError);
  assertInstanceOf(schema.check([], context), SchemaError);
});

Deno.test("should pass a nested tuple", () => {
  const schema = tuple(tuple(number(), number()), number());

  assertEquals(schema.check([[1, 2], 2], context), [[1, 2], 2]);
  assertEquals(schema.check([[2, 2], 4], context), [[2, 2], 4]);
});

Deno.test("should return an issue path correctly", () => {
  const schema = tuple(number(), number());

  const received = [false];
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
  assertObjectMatch(output.first(), { path: [0] });
});
