import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { maxLength } from "./maxLength.ts";
import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should assert arrays with fixed length", () => {
  const schema = pipe(array(number()), maxLength(3));

  assertEquals(schema.check([1, 2], context), [1, 2]);
  assertIsError(schema.check([1, 2, 3, 4], context), SchemaError);
});

Deno.test("should assert strings with fixed length", () => {
  const schema = pipe(string(), maxLength(5));

  assertEquals(schema.check("hola", context), "hola");
  assertIsError(schema.check("hallo", context), SchemaError);
});
