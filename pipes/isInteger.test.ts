import { assertObjectMatch } from "assert/mod.ts";
import { number, pipe } from "../schemas.ts";
import { isInteger } from "./isInteger.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(number(), isInteger());

Deno.test("assert integer numbers", () => {
  const correct = [1, -1, 100_000];
  const incorrect = [1.23, 0.12, 0.1 + 0.2];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
