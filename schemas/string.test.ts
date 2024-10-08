import { assertObjectMatch } from "@std/assert";
import { string } from "../schemas.ts";
import { safeParse } from "../utils.ts";

const schema = string();

Deno.test("assert with strings", () => {
  const correct = [`hello`, `hola`];
  const incorrect = [1234, true, false, null, [], {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
