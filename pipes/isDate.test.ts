import { assertObjectMatch } from "assert/mod.ts";
import { isDate } from "./isDate.ts";
import { pipe, string } from "../schemas.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(string(), isDate());

Deno.test("should return true for valid ISO-8601 date strings", () => {
  const validStrings = [
    "2022-01-01",
    "2022-02-28",
    "2022-12-31",
  ];

  for (const str of validStrings) {
    const result = safeParse(str, schema);
    assertObjectMatch(result, { success: true, value: str });
  }
});

Deno.test("should return false for invalid ISO-8601 date strings", () => {
  const invalidStrings = [
    "2022-00-01",
    "2022-13-01",
    "2022-01-32",
    "2022-12-32",
    "2022-13-32",
    "2022-01-01T00:00:00Z",
    "2022-01-01T00:00:00.123Z",
  ];

  for (const str of invalidStrings) {
    console.log(str);
    const result = safeParse(str, schema);
    assertObjectMatch(result, { success: false });
  }
});
