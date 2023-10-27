import { assertIsError, assertObjectMatch } from "assert/mod.ts";
import { Describe } from "../schema.ts";
import { createContext } from "../context.ts";
import { createError } from "../errors.ts";
import { array, lazy, object } from "./mod.ts";

const context = createContext();

Deno.test("should forward the given error", () => {
  const schema = lazy(() => createError(context));

  const examples = ["hello", 1234, true, false, null, [], {}];

  for (const example of examples) {
    assertIsError(schema.check(example, context));
  }
});

Deno.test("should allow recursive schemas", () => {
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
    assertObjectMatch(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
