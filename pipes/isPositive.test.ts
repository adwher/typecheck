import { assertObjectMatch } from "assert/mod.ts";
import { number, pipe } from "../schemas.ts";
import { isPositive } from "./isPositive.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(number(), isPositive());

Deno.test("assert negative numbers", () => {
  const correct = [1, 10, 100_000];
  const incorrect = [-1, -10, -100_000];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
