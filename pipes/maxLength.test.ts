import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { array, number, pipe, string } from "../schemas/mod.ts";
import { maxLength } from "./maxLength.ts";
import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should assert arrays with fixed length", () => {
  const schema = pipe(array(number()), maxLength(3));

  assertEquals(schema.check([1, 2], context), [1, 2]);
  assertEquals(schema.check([2, 4], context), [2, 4]);

  assertInstanceOf(schema.check([1, 2, 3], context), SchemaError);
  assertInstanceOf(schema.check([1, 2, 3, 4], context), SchemaError);
});

Deno.test("should assert strings with fixed length", () => {
  const schema = pipe(string(), maxLength(5));

  assertEquals(schema.check("hola", context), "hola");
  assertEquals(schema.check("bye", context), "bye");

  assertInstanceOf(schema.check("hello", context), SchemaError);
  assertInstanceOf(schema.check("hallo", context), SchemaError);
});
