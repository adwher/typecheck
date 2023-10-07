import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { array, number, pipe, string } from "../schemas/mod.ts";
import { length } from "./length.ts";
import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should assert arrays with fixed length", () => {
  const schema = pipe(array(number()), length(2));

  assertEquals(schema.check([1, 2], context), [1, 2]);
  assertEquals(schema.check([2, 4], context), [2, 4]);

  assertInstanceOf(schema.check([1, 2, 3], context), SchemaError);
  assertInstanceOf(schema.check([1, 2, 3, 4], context), SchemaError);
});

Deno.test("should assert strings with fixed length", () => {
  const schema = pipe(string(), length(5));

  assertEquals(schema.check("hello", context), "hello");
  assertEquals(schema.check("hallo", context), "hallo");

  assertInstanceOf(schema.check("hola", context), SchemaError);
  assertInstanceOf(schema.check("bye", context), SchemaError);
});
