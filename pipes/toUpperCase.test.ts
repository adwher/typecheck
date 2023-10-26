import { assertEquals } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { toUpperCase } from "./toUpperCase.ts";

const context = createContext();
const schema = pipe(string(), toUpperCase());

Deno.test("should replace with upper case", () => {
  const cases = [
    ["BYE", "BYE"],
    ["hello", "HELLO"],
    ["Joe Doe", "JOE DOE"],
    ["The New YORK Times", "THE NEW YORK TIMES"],
    ["must be in upper case", "MUST BE IN UPPER CASE"],
  ];

  for (const [received, expected] of cases) {
    assertEquals(schema.check(received, context), expected);
  }
});
