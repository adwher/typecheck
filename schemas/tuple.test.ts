import { assertEquals } from "std/assert/assert_equals.ts";
import { assertInstanceOf } from "std/assert/assert_instance_of.ts";
import { assertObjectMatch } from "std/assert/assert_object_match.ts";

import { SchemaContext } from "../context.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";
import { tuple } from "./tuple.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass a simple tuple", () => {
  const received: unknown = [1, 2, 3];

  const schema = tuple(number(), number(), number());
  const output = schema.check(received, context);

  assertEquals(output, received);
});

Deno.test("should pass a nested tuple", () => {
  const received: unknown = [[1, 2], 2];

  const schema = tuple(tuple(number(), number()), number());
  const output = schema.check(received, context);

  assertEquals(output, received);
});

Deno.test("should discard non-tuple values", () => {
  const received = "";

  const schema = tuple(number(), number());
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});

Deno.test("should return an issue path correctly", () => {
  const received = [false];

  const schema = tuple(number(), number());
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
  assertObjectMatch(output.first(), { path: [0] });
});
