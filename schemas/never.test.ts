import { assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { never } from "./never.ts";

const context = createContext();
const schema = never();

Deno.test("always return an error", () => {
  const incorrect = ["hello", 1234, null, true, false, [], {}];

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
