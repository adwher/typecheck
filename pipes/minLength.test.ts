import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { minLength } from "./minLength.ts";
import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should assert arrays with fixed length", () => {
  const schema = pipe(array(number()), minLength(2));

  assertEquals(schema.check([1, 2, 3, 4], context), [1, 2, 3, 4]);
  assertIsError(schema.check([], context), SchemaError);
});

Deno.test("should assert strings with fixed length", () => {
  const schema = pipe(string(), minLength(4));

  assertEquals(schema.check("hello", context), "hello");
  assertIsError(schema.check("", context), SchemaError);
});
