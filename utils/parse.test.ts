import { assertEquals, assertThrows } from "std/assert/mod.ts";

import { string } from "../schemas/string.ts";
import { parse } from "./parse.ts";
import { SchemaError } from "../errors.ts";

Deno.test("should thrown for non-valid values", () => {
  const schema = string();

  assertThrows(() => parse(false, schema), SchemaError);
});

Deno.test("should return the same value", () => {
  const schema = string();
  const expected = "hey";

  const output = parse(expected, schema);

  assertEquals(output, expected);
});
