import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { enumerated } from "./enumerated.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass allowed values", () => {
  const schema = enumerated("hello", "hola", "hallo");

  assertEquals(schema.check("hello", context), "hello");
  assertEquals(schema.check("hola", context), "hola");
  assertEquals(schema.check("hallo", context), "hallo");

  assertInstanceOf(schema.check("bye", context), SchemaError);
  assertInstanceOf(schema.check("adios", context), SchemaError);
  assertInstanceOf(schema.check("doei", context), SchemaError);
});
