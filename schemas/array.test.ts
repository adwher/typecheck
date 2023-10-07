import {
  assertEquals,
  assertInstanceOf,
  assertObjectMatch,
} from "std/assert/mod.ts";

import { SchemaContext } from "../context.ts";
import { array } from "./array.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass simple array schemas", () => {
  const schema = array(number());

  assertEquals(schema.check([1, 2, 3], context), [1, 2, 3]);
  assertEquals(schema.check([2, 4, 6], context), [2, 4, 6]);

  assertInstanceOf(schema.check("", context), SchemaError);
  assertInstanceOf(schema.check(1234, context), SchemaError);
  assertInstanceOf(schema.check([true, false], context), SchemaError);
});

Deno.test("should pass nested array schemas", () => {
  const schema = array(array(number()));

  assertEquals(schema.check([[1, 2], [2, 3]], context), [[1, 2], [2, 3]]);
  assertEquals(schema.check([[2, 3], [3, 4]], context), [[2, 3], [3, 4]]);
});

Deno.test("should return an issue path correctly", () => {
  const schema = array(number());
  const output = schema.check([1, 2, false], context);

  assertInstanceOf(output, SchemaError);
  assertObjectMatch(output.first(), { path: [2] });
});
