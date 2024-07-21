import { assertObjectMatch } from "assert/mod.ts";
import { number, pipe } from "../schemas.ts";
import { minValue } from "./minValue.ts";
import { safeParse } from "../mod.ts";

const schema = pipe(number(), minValue(2));

Deno.test("restrict the allowed numbers", () => {
  const correct = [3, 4, 5];
  const incorrect = [0, 1, 2];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
