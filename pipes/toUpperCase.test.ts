import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { toUpperCase } from "./toUpperCase.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(string(), toUpperCase());

Deno.test("replace with upper case", () => {
  const cases = [
    ["BYE", "BYE"],
    ["hello", "HELLO"],
    ["Joe Doe", "JOE DOE"],
    ["The New YORK Times", "THE NEW YORK TIMES"],
    ["must be in upper case", "MUST BE IN UPPER CASE"],
  ];

  for (const [received, expected] of cases) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: expected });
  }
});
