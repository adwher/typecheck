import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, pipe } from "../schemas/mod.ts";
import { minValue } from "./minValue.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should restrict the allowed numbers", () => {
  const schema = pipe(number(), minValue(2));

  assertEquals(schema.check(3, context), 3);
  assertIsError(schema.check(2, context), SchemaError);
  assertIsError(schema.check(1, context), SchemaError);
});
