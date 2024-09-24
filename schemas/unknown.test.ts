import { assertObjectMatch } from "@std/assert";
import { unknown } from "../schemas.ts";
import { safeParse } from "../utils.ts";

const schema = unknown();

Deno.test("assert with any value", () => {
  const examples: unknown[] = [`hello`, `hola`, 1234, false, null, [], {}];

  for (const received of examples) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }
});
