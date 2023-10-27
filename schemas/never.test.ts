import { assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { never } from "./mod.ts";

const context = createContext();

Deno.test("should always return an error", () => {
  const schema = never();
  const examples = ["hello", 1234, null, true, false, [], {}];

  for (const example of examples) {
    assertIsError(schema.check(example, context));
  }
});
