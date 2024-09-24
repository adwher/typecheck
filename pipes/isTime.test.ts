import { assertObjectMatch } from "@std/assert";
import { isTime } from "./isTime.ts";
import { safeParse } from "../utils.ts";
import { pipe, string } from "../schemas.ts";

const schema = pipe(string(), isTime());

Deno.test("should match ISO-8601 time format", () => {
  const validStrings = ["00:00", "12:34", "23:59"];
  const invalidStrings = ["24:00", "12:345", "23:60", "12:34:56"];

  for (const time of validStrings) {
    const result = safeParse(time, schema);
    assertObjectMatch(result, { success: true, value: time });
  }

  for (const str of invalidStrings) {
    console.log(str);
    const result = safeParse(str, schema);
    assertObjectMatch(result, { success: false });
  }
});
