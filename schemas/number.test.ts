import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { SchemaContext } from "../context.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass number values", () => {
  const schema = number();

  assertEquals(schema.check(1234, context), 1234);
  assertEquals(schema.check(1111, context), 1111);

  assertInstanceOf(schema.check("", context), SchemaError);
  assertInstanceOf(schema.check(false, context), SchemaError);
  assertInstanceOf(schema.check(null, context), SchemaError);
  assertInstanceOf(schema.check([], context), SchemaError);
});
