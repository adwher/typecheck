import { assertObjectMatch } from "assert/mod.ts";
import { unknown } from "./mod.ts";
import { safeParse } from "../utils/mod.ts";

const schema = unknown();

Deno.test("assert with any value", () => {
  const examples: unknown[] = [`hello`, `hola`, 1234, false, null, [], {}];

  for (const received of examples) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }
});
