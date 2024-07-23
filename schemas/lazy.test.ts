import { assertObjectMatch } from "assert/mod.ts";
import { type Describe, failure } from "../schema.ts";
import { array, lazy, object } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("forward the given error", () => {
  const schema = lazy(() => failure());

  const examples = ["hello", 1234, true, false, null, [], {}];

  for (const received of examples) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("allow recursive schemas", () => {
  type Node = { children: Node[] };

  const schema: Describe<Node> = lazy(() =>
    object({ children: array(schema) })
  );

  const correct = [
    { children: [] },
    { children: [{ children: [] }] },
    { children: [{ children: [{ children: [] }] }] },
  ];

  const incorrect = ["hello", 1234, true, false, null, [], {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
