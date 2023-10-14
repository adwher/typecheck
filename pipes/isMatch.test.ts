import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { isMatch } from "./isMatch.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should pass accepted values on the regular-expression", () => {
  const schema = pipe(string(), isMatch(/[A-Z]{3}-\d{1,}/i));

  assertEquals(schema.check("ABC-123", context), "ABC-123");
  assertEquals(schema.check("XYZ-456", context), "XYZ-456");

  assertIsError(schema.check("ABCD", context), SchemaError);
  assertIsError(schema.check("AB-1234", context), SchemaError);
});
