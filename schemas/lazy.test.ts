import { assertIsError, assertObjectMatch } from "std/assert/mod.ts";
import { Describe } from "../schema.ts";
import { array, lazy, object } from "./mod.ts";
import { createContext } from "../context.ts";
import { createError } from "../errors.ts";

const context = createContext();

Deno.test("return given errors", () => {
  const schema = lazy(() => createError(context));

  const examples = ["hello", 1234, true, false, null, [], {}];

  for (const example of examples) {
    assertIsError(schema.check(example, context));
  }
});

Deno.test("allow nested schemas", () => {
  type Node = { children: Node[] };

  const schema: Describe<Node> = lazy(() =>
    object({ children: array(schema) })
  );

  const received = { children: [{ children: [] }] };
  const expected = { children: [{ children: [] }] };

  assertObjectMatch(schema.check(received, context), expected);
});
