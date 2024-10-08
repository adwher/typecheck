import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { toLowerCase } from "./toLowerCase.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(string(), toLowerCase());

Deno.test("replace with lower case", () => {
  const cases = [
    ["bye", "bye"],
    ["HELLO", "hello"],
    ["Joe Doe", "joe doe"],
    ["The New YORK Times", "the new york times"],
    ["MUST BE IN LOWER CASE", "must be in lower case"],
  ];

  for (const [received, expected] of cases) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: expected });
  }
});
