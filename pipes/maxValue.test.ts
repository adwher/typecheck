import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { maxValue } from "./maxValue.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should restrict the allowed numbers", () => {
  const schema = pipe(number(), maxValue(3));

  assertEquals(schema.check(2, context), 2);
  assertIsError(schema.check(3, context), SchemaError);
  assertIsError(schema.check(4, context), SchemaError);
});
