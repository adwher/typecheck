import { assertObjectMatch } from "assert/mod.ts";
import { array, number, pipe, string } from "../schemas.ts";
import { maxLength } from "./maxLength.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert arrays with fixed length", () => {
  const schema = pipe(array(number()), maxLength(3));

  const correct = [[1, 2], [3, 4]];
  const incorrect = [[1, 2, 3], [true, false], null, {}];

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
  const schema = pipe(string(), maxLength(5));

  const correct = ["hola", "bye"];
  const incorrect = ["hello", "world", [1, 2, 3, 4]];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
