import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { either } from "./either.ts";
import { string } from "./string.ts";
import { number } from "./number.ts";
import { boolean } from "./boolean.ts";

const context = createContext();

Deno.test("should pass allowed values", () => {
  const schema = either(string(), number());

  assertEquals(schema.check(1234, context), 1234);
  assertEquals(schema.check("hello", context), "hello");

  assertIsError(schema.check(false, context), SchemaError);
  assertIsError(schema.check(null, context), SchemaError);
  assertIsError(schema.check([], context), SchemaError);
});

Deno.test("should pass nested unions", () => {
  const schema = either(either(string(), number()), boolean());

  assertEquals(schema.check(1234, context), 1234);
  assertEquals(schema.check(true, context), true);
  assertEquals(schema.check(false, context), false);
  assertEquals(schema.check("hello", context), "hello");
});
