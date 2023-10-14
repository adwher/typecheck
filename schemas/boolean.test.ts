import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { boolean } from "./boolean.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should pass boolean values", () => {
  const schema = boolean();

  assertEquals(schema.check(true, context), true);
  assertEquals(schema.check(false, context), false);

  assertIsError(schema.check("", context), SchemaError);
  assertIsError(schema.check(1234, context), SchemaError);
  assertIsError(schema.check(null, context), SchemaError);
  assertIsError(schema.check([], context), SchemaError);
});
