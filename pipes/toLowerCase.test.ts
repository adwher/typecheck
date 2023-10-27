import { assertEquals } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { toLowerCase } from "./toLowerCase.ts";

const context = createContext();
const schema = pipe(string(), toLowerCase());

Deno.test("should replace with lower case", () => {
  const cases = [
    ["bye", "bye"],
    ["HELLO", "hello"],
    ["Joe Doe", "joe doe"],
    ["The New YORK Times", "the new york times"],
    ["MUST BE IN LOWER CASE", "must be in lower case"],
  ];

  for (const [received, expected] of cases) {
    assertEquals(schema.check(received, context), expected);
  }
});
