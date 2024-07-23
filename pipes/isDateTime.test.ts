import { assertObjectMatch } from "assert/mod.ts";
import { isDateTime } from "./isDateTime.ts";
import { pipe, string } from "../schemas.ts";
import { safeParse } from "../utils.ts";

const schema = pipe(string(), isDateTime());

Deno.test("should return true for valid ISO-8601 strings", () => {
  const validStrings = [
    "2022-01-01T00:00:00Z",
    "2022-01-01T00:00:00+00:00",
    "2022-01-01T00:00:00-00:00",
    "2022-01-01T00:00:00.123Z",
    "2022-01-01T00:00:00.123+00:00",
    "2022-01-01T00:00:00.123-00:00",
  ];

  for (const str of validStrings) {
    const result = safeParse(str, schema);
    assertObjectMatch(result, { success: true, value: str });
  }
});

Deno.test("should return false for invalid ISO-8601 strings", () => {
  const invalidStrings = [
    "2022-13-01T00:00:00Z",
    "2022-01-01T24:00:00Z",
    "2022-01-01T00:60:00Z",
    "2022-01-01T00:00:60Z",
    "2022-01-01T00:00:00.1234567890Z",
    "2022-01-01T00:00:00.1234567890+00:00",
    "2022-01-01T00:00:00.1234567890-00:00",
    "2022-01-01T00:00:00.123+24:00",
    "2022-01-01T00:00:00.123-24:00",
  ];

  for (const str of invalidStrings) {
    const result = safeParse(str, schema);
    assertObjectMatch(result, { success: false });
  }
});
