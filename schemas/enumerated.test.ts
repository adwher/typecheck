import { assertEquals, assertIsError } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { enumerated } from "./enumerated.ts";

const context = createContext();

Deno.test("should pass allowed values", () => {
  const schema = enumerated("hello", "hola", "hallo");

  assertEquals(schema.check("hello", context), "hello");
  assertEquals(schema.check("hola", context), "hola");
  assertEquals(schema.check("hallo", context), "hallo");

  assertIsError(schema.check("bye", context), SchemaError);
  assertIsError(schema.check("adios", context), SchemaError);
  assertIsError(schema.check("doei", context), SchemaError);
});
