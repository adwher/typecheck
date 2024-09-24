import { assertEquals, assertThrows } from "@std/assert";

import { pipe, string } from "../schemas.ts";
import { parse } from "./parse.ts";

Deno.test("thrown for non-valid values", () => {
  const schema = string();

  assertThrows(() => parse(false, schema));

  assertEquals(parse("hey", schema), "hey");
  assertEquals(parse("hello", schema), "hello");
  assertEquals(parse("hola", schema), "hola");
});

Deno.test("return transformed values", () => {
  const schema = pipe(string(), (value) => value.toUpperCase());

  assertEquals(parse("hey", schema), "HEY");
  assertEquals(parse("hello", schema), "HELLO");
  assertEquals(parse("hola", schema), "HOLA");
});
