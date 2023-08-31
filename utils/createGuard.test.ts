import { assert, assertEquals } from "std/assert/mod.ts";

import { string } from "../schemas/string.ts";
import { createGuard } from "./createGuard.ts";

const schema = string();
const guard = createGuard(schema);

Deno.test("should return a guard function", () => {
  assert(typeof guard === "function");
});

Deno.test("should guard asserts the schema", () => {
  assertEquals(guard(""), true);
  assertEquals(guard(1234), false);
  assertEquals(guard(null), false);
});
