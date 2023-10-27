import { assertEquals } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { toTrimmed } from "./toTrimmed.ts";

const context = createContext();
const schema = pipe(string(), toTrimmed());

Deno.test("should remove white spaces", () => {
  const cases = [
    [" one", "one"],
    ["one ", "one"],
    ["two  ", "two"],
    ["  two", "two"],
  ];

  for (const [received, expected] of cases) {
    assertEquals(schema.check(received, context), expected);
  }
});
