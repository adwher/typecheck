import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { toTrimmed } from "./toTrimmed.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(string(), toTrimmed());

Deno.test("remove white spaces", () => {
  const cases = [
    [" one", "one"],
    ["one ", "one"],
    ["two  ", "two"],
    ["  two", "two"],
  ];

  for (const [received, expected] of cases) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: expected });
  }
});
