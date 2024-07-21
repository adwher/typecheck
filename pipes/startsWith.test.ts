import { assertObjectMatch } from "assert/mod.ts";
import { pipe, string } from "../schemas.ts";
import { startsWith } from "./startsWith.ts";
import { safeParse } from "../utils.ts";

Deno.test("starts with the specified search", () => {
  const schema = pipe(string(), startsWith("abc"));

  const correct = [`abc`, `abc123`, `abcd`, `abcd123`];
  const incorrect = [``, `ab`, `ac`, `abC`, `ABC`, `a1234`];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
