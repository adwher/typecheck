import { assertEquals } from "std/assert/assert_equals.ts";
import { assertInstanceOf } from "std/assert/assert_instance_of.ts";
import { assertObjectMatch } from "std/assert/assert_object_match.ts";

import { SchemaContext } from "../context.ts";
import { array } from "./array.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass simple array schemas", () => {
  const received = [1, 2, 3];

  const schema = array(number());
  const output = schema.check(received, context);

  assertEquals(output, received);
});

Deno.test("should pass nested array schemas", () => {
  const received = [[1, 2], [2, 3], [3, 4]];

  const schema = array(array(number()));
  const output = schema.check(received, context);

  assertEquals(output, received);
});

Deno.test("should discard non-array values", () => {
  const received = "";

  const schema = array(number());
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});

Deno.test("should return an issue path", () => {
  const received = [1, 2, false];

  const schema = array(number());
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
  assertObjectMatch(output.first(), { path: [2] });
});
