import { assertObjectMatch } from "@std/assert";
import { array, number, pipe, string } from "../schemas.ts";
import { safeParse } from "../utils.ts";
import { nonEmpty } from "./nonEmpty.ts";

Deno.test("assert arrays non-empty", () => {
  const schema = pipe(array(number()), nonEmpty());

  const correct = [[1], [1, 2, 3, 4, 5]];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  const commit = safeParse([], schema);
  assertObjectMatch(commit, { success: false });
});

Deno.test("assert strings non-empty", () => {
  const schema = pipe(string(), nonEmpty());

  const correct = ["a", "abc"];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  const commit = safeParse("", schema);
  assertObjectMatch(commit, { success: false });
});
