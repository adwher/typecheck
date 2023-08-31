import { assert, assertEquals } from "std/assert/mod.ts";

import { string } from "../schemas/string.ts";
import { check } from "./check.ts";

const schema = string();

Deno.test("should return a guard function", () => {
  assert(check("hey", schema));
});

Deno.test("should guard asserts the schema", () => {
  assertEquals(check("", schema), true);
  assertEquals(check(1234, schema), false);
  assertEquals(check(null, schema), false);
});
