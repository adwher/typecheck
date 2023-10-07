import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { SchemaContext } from "../context.ts";
import { boolean } from "./boolean.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass boolean values", () => {
  const schema = boolean();

  assertEquals(schema.check(true, context), true);
  assertEquals(schema.check(false, context), false);

  assertInstanceOf(schema.check("", context), SchemaError);
  assertInstanceOf(schema.check(1234, context), SchemaError);
  assertInstanceOf(schema.check(null, context), SchemaError);
  assertInstanceOf(schema.check([], context), SchemaError);
});
