import { assertEquals } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { toUpperCase } from "./toUpperCase.ts";

const context = createContext();
const schema = pipe(string(), toUpperCase());

Deno.test("replace with upper case", () => {
  const examples = [
    ["BYE", "BYE"],
    ["hello", "HELLO"],
    ["Joe Doe", "JOE DOE"],
    ["The New YORK Times", "THE NEW YORK TIMES"],
    ["must be in upper case", "MUST BE IN UPPER CASE"],
  ];

  for (const [example, lowercase] of examples) {
    assertEquals(schema.check(example, context), lowercase);
  }
});