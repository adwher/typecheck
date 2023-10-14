import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { string } from "./string.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should pass string values", () => {
  const schema = string();

  assertEquals(schema.check("hello", context), "hello");
  assertEquals(schema.check("hola", context), "hola");

  assertIsError(schema.check(1234, context), SchemaError);
  assertIsError(schema.check(false, context), SchemaError);
  assertIsError(schema.check(null, context), SchemaError);
  assertIsError(schema.check([], context), SchemaError);
});
