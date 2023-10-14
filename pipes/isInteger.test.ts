import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { number, pipe } from "../schemas/mod.ts";
import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { isInteger } from "./isInteger.ts";

const context = createContext();

Deno.test("should assert integer numbers", () => {
  const schema = pipe(number(), isInteger());

  assertEquals(schema.check(1, context), 1);
  assertIsError(schema.check(2.5, context), SchemaError);
});
