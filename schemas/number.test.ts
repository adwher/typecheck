import { assertObjectMatch } from "@std/assert";
import { number } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert number values", () => {
  const schema = number();

  const correct: unknown[] = [123, -123, 10_000, 0.1];
  const incorrect = ["hello", null, true, false, [], {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
