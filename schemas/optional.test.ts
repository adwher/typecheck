import { assertObjectMatch } from "assert/mod.ts";
import { boolean, optional, string } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test(`pass either wrapped or "undefined" values`, () => {
  const schema = optional(boolean());

  const correct = [true, false, undefined];
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

Deno.test(`use the fallback`, () => {
  const schema = optional(string(), "hello");

  assertObjectMatch(safeParse(undefined, schema), {
    success: true,
    value: "hello",
  });

  assertObjectMatch(safeParse("world", schema), {
    success: true,
    value: "world",
  });
});
