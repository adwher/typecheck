import { assertObjectMatch } from "assert/mod.ts";
import { number, tuple } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert with tuples", () => {
  const schema = tuple(number(), number());

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[1], [1, 2, 3], false, null, [], {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("return an issue with the right path", () => {
  const schema = tuple(number(), number(), number());
  const commit = safeParse([1, 2, false], schema);

  assertObjectMatch(commit, { success: false });
  assertObjectMatch(commit, { issues: [{ position: 2 }] });
});
