import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { number, pipe } from "../schemas/mod.ts";
import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { isPositive } from "./isPositive.ts";

const context: SchemaContext = { path: [] };

Deno.test("should assert negative numbers", () => {
  const schema = pipe(number(), isPositive());

  assertEquals(schema.check(1, context), 1);
  assertInstanceOf(schema.check(-1, context), SchemaError);
});
