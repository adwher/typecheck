import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { SchemaContext } from "../context.ts";
import { string } from "./string.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass string values", () => {
  const schema = string();

  assertEquals(schema.check("hello", context), "hello");
  assertEquals(schema.check("hola", context), "hola");

  assertInstanceOf(schema.check(1234, context), SchemaError);
  assertInstanceOf(schema.check(false, context), SchemaError);
  assertInstanceOf(schema.check(null, context), SchemaError);
  assertInstanceOf(schema.check([], context), SchemaError);
});
