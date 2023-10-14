import { assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { never } from "./never.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should always return an error", () => {
  const schema = never();

  assertIsError(schema.check(1234, context), SchemaError);
  assertIsError(schema.check("hello", context), SchemaError);
  assertIsError(schema.check(true, context), SchemaError);
  assertIsError(schema.check(false, context), SchemaError);
  assertIsError(schema.check(null, context), SchemaError);
});
