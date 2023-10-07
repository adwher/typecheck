import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";

import { number, pipe } from "../schemas/mod.ts";
import { SchemaContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { isInteger } from "./isInteger.ts";

const context: SchemaContext = { path: [] };

Deno.test("should assert integer numbers", () => {
  const schema = pipe(number(), isInteger());

  assertEquals(schema.check(1, context), 1);
  assertInstanceOf(schema.check(2.5, context), SchemaError);
});
