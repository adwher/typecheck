import { assert, assertEquals } from "assert/mod.ts";

import { string } from "../schemas/string.ts";
import { createGuard } from "./createGuard.ts";

const schema = string();
const guard = createGuard(schema);

Deno.test("return a guard function", () => {
  assert(typeof guard === "function");
  assert(guard("hello"));

  assertEquals(guard(1234), false);
  assertEquals(guard(null), false);
});
