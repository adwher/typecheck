import { assertObjectMatch } from "@std/assert";
import { never } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("always return an error", () => {
  const schema = never();
  const examples: unknown[] = ["hello", 1234, null, true, false, [], {}];

  for (const received of examples) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
