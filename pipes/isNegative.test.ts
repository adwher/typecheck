import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { number, pipe } from "../schemas/mod.ts";
import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { isNegative } from "./isNegative.ts";

const context = createContext();

Deno.test("should assert negative numbers", () => {
  const schema = pipe(number(), isNegative());

  assertEquals(schema.check(-1, context), -1);
  assertIsError(schema.check(1, context), SchemaError);
});
