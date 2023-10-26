import { assertEquals, assertThrows } from "std/assert/mod.ts";

import { string } from "../schemas/string.ts";
import { parse } from "./parse.ts";

Deno.test("thrown for non-valid values", () => {
  const schema = string();

  assertThrows(() => parse(false, schema));

  assertEquals(parse("hey", schema), "hey");
  assertEquals(parse("hello", schema), "hello");
  assertEquals(parse("hola", schema), "hola");
});
