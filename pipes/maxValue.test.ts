import { assertObjectMatch } from "assert/mod.ts";
import { number, pipe } from "../schemas.ts";
import { maxValue } from "./maxValue.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(number(), maxValue(3));

Deno.test("restrict the allowed numbers", () => {
  const correct = [0, 1, 2];
  const incorrect = [3, 4, 5];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
