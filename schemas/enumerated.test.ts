import { assertObjectMatch } from "@std/assert";
import { enumerated } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert with the given options", () => {
  const schema = enumerated("hello", "hola", "hallo");

  const correct: unknown[] = ["hello", "hola", "hallo"];
  const incorrect = ["bye", "adios", 1234, null, true, false, [], {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
