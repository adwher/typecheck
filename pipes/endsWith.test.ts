import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { endsWith } from "./endsWith.ts";
import { safeParse } from "../utils.ts";

Deno.test("ends with the specified search", () => {
  const schema = pipe(string(), endsWith("abc"));

  const correct = ["abc", "123abc", "dabc", "123dabc"];
  const incorrect = ["", "ab", "ac", "abC", "ABC", "1234a"];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
