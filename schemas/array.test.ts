import { assertObjectMatch } from "assert/mod.ts";
import { array, number } from "./mod.ts";
import { safeParse } from "../utils/mod.ts";

const schema = array(number());

Deno.test("assert with arrays", () => {
  const correct = [[1, 2], [10_000, 20_000]];
  const incorrect = [[1, false], [true, false], ["hello", "world"]];

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
  const commit = safeParse([1, 2, false], schema);

  assertObjectMatch(commit, { success: false, issues: [{ position: 2 }] });
});
