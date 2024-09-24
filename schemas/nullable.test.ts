import { assertObjectMatch } from "@std/assert";
import { boolean, nullable, string } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test(`pass either wrapped or "null" values`, () => {
  const schema = nullable(boolean());

  const correct = [true, false, null];
  const incorrect = ["hello", 1234, undefined, [], {}];

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
  const schema = nullable(string(), "hello");

  assertObjectMatch(safeParse(null, schema), {
    success: true,
    value: "hello",
  });

  assertObjectMatch(safeParse("world", schema), {
    success: true,
    value: "world",
  });
});
