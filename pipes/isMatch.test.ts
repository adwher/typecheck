import { assertObjectMatch } from "assert/mod.ts";
import { pipe, string } from "../schemas/mod.ts";
import { isMatch } from "./isMatch.ts";
import { safeParse } from "../utils/mod.ts";

const schema = pipe(string(), isMatch(/[A-Z]{3}-\d{1,}/i));

Deno.test("pass accepted values on the regular-expression", () => {
  const correct = ["ABC-123", "XYZ-456"];
  const incorrect = ["ABCD", "AB-1234"];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
