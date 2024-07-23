import { assertObjectMatch } from "assert/mod.ts";
import { safeParse } from "../mod.ts";
import { date } from "./date.ts";

Deno.test("return on success", () => {
  const schema = date();
  const value = new Date();

  const commit = safeParse(value, schema);
  assertObjectMatch(commit, { success: true, value });
});

Deno.test("return on failure", () => {
  const schema = date();
  const value = "2022-13-01"; // Invalid date format

  const commit = safeParse(value, schema);
  assertObjectMatch(commit, { success: false });
});
