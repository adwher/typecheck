import { assertEquals } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { toLowerCase } from "./toLowerCase.ts";

const context = createContext();
const schema = pipe(string(), toLowerCase());

Deno.test("replace with lower case", () => {
  const examples = [
    ["bye", "bye"],
    ["HELLO", "hello"],
    ["Joe Doe", "joe doe"],
    ["The New YORK Times", "the new york times"],
    ["MUST BE IN LOWER CASE", "must be in lower case"],
  ];

  for (const [example, lowercase] of examples) {
    assertEquals(schema.check(example, context), lowercase);
  }
});
