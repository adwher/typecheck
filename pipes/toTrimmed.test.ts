import { assertEquals } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { toTrimmed } from "./toTrimmed.ts";

const context = createContext();
const schema = pipe(string(), toTrimmed());

Deno.test("remove white spaces", () => {
  const examples = [
    [" one", "one"],
    ["one ", "one"],
    ["two  ", "two"],
    ["  two", "two"],
  ];

  for (const [example, trimmed] of examples) {
    assertEquals(schema.check(example, context), trimmed);
  }
});
