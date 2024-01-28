import { assertObjectMatch } from "assert/mod.ts";
import { string } from "../schemas/string.ts";
import { safeParse } from "./safeParse.ts";

Deno.test("return negative response for non-valid values", () => {
  const schema = string();

  assertObjectMatch(safeParse(1234, schema), { success: false });
  assertObjectMatch(safeParse("hey", schema), { success: true, value: "hey" });
});
