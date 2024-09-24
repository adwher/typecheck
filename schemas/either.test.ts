import { assertObjectMatch } from "@std/assert";
import { boolean, either, number, string } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert with the given schemas", () => {
  const schema = either(string(), number());

  const correct: unknown[] = ["hello", "world", 1234, 0.25];
  const incorrect = [true, false, null, {}, []];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("assert with nested schemas", () => {
  const schema = either(either(string(), number()), boolean());

  const correct: unknown[] = ["hello", "world", 1234, true, false];
  const incorrect = [null, {}, []];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
