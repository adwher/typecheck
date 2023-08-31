import { assertObjectMatch } from "std/assert/mod.ts";

import { string } from "../schemas/string.ts";
import { safeParse } from "./safeParse.ts";

Deno.test("should return negative response for non-valid values", () => {
  const schema = string();
  const output = safeParse(1234, schema);

  assertObjectMatch(output, { success: false });
});

Deno.test("should return positive response with the same value", () => {
  const expected = "hey";

  const schema = string();
  const output = safeParse(expected, schema);

  assertObjectMatch(output, { success: true, data: expected });
});
