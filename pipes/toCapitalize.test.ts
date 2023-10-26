import { assertEquals } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { toCapitalize } from "./toCapitalize.ts";

const context = createContext();
const schema = pipe(string(), toCapitalize());

Deno.test("should capitalize the given text", () => {
  const cases = [
    ["hello", "Hello"],
    ["joe doe", "Joe Doe"],
    ["the new york times", "The New York Times"],
    ["must be capitalized", "Must Be Capitalized"],
  ];

  for (const [received, expected] of cases) {
    assertEquals(schema.check(received, context), expected);
  }
});
