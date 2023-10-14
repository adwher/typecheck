import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should pass number values", () => {
  const schema = number();

  assertEquals(schema.check(1234, context), 1234);
  assertEquals(schema.check(1111, context), 1111);

  assertIsError(schema.check("", context), SchemaError);
  assertIsError(schema.check(false, context), SchemaError);
  assertIsError(schema.check(null, context), SchemaError);
  assertIsError(schema.check([], context), SchemaError);
});
