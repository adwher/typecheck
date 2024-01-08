import { assertObjectMatch } from "assert/mod.ts";
import { array, number, pipe, string } from "../schemas/mod.ts";
import { minLength } from "./minLength.ts";
import { safeParse } from "../utils/mod.ts";

Deno.test("assert arrays with fixed length", () => {
  const schema = pipe(array(number()), minLength(2));

  const correct = [[1, 2, 3], [3, 4, 5]];
  const incorrect = [[1, 2], [true, false, true, false], null, {}];

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
  const schema = pipe(string(), minLength(4));

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
