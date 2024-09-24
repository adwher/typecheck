import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { toCapitalize } from "./toCapitalize.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(string(), toCapitalize());

Deno.test("capitalize the given text", () => {
  const cases = [
    ["hello", "Hello"],
    ["joe doe", "Joe Doe"],
    ["the new york times", "The New York Times"],
    ["must be capitalized", "Must Be Capitalized"],
  ];

  for (const [received, expected] of cases) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: expected });
  }
});
