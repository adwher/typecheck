import { assertObjectMatch } from "@std/assert";
import { boolean } from "../schemas.ts";
import { safeParse } from "../utils.ts";

const schema = boolean();

Deno.test("assert with booleans", () => {
  const correct = [true, false];
  const incorrect = ["hello", 1234, null, [], {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
