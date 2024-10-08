import { assertObjectMatch } from "@std/assert";
import { number, record } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("allow only the given schema", () => {
  const schema = record(number());

  const correct: unknown[] = [{ one: 1 }, { thousand: 1000 }];
  const incorrect = [{ 123: "123" }, "hello", 1234, true, false, null, []];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
