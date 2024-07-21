import { assertObjectMatch } from "assert/mod.ts";
import { array, number, pipe, string } from "../schemas.ts";
import { length } from "./length.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert arrays with fixed length", () => {
  const schema = pipe(array(number()), length(2));

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[true, false], null, {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("assert strings with fixed length", () => {
  const schema = pipe(string(), length(5));

  const correct = ["hello", "world"];
  const incorrect = ["hola", "bye", [1, 2, 3, 4, 5]];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
