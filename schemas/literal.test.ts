import { assertObjectMatch } from "assert/mod.ts";
import { literal } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert with the given literal", () => {
  const schema = literal("hello");
  const incorrect = ["bye", 1234, undefined, [], {}];

  const commit = safeParse("hello", schema);

  // Yep, only one schema be allowed
  assertObjectMatch(commit, { success: true, value: "hello" });

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
