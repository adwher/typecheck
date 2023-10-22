import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { pipe, string } from "../schemas/mod.ts";
import { createContext } from "../context.ts";
import { isURL } from "./isURL.ts";

const context = createContext();

Deno.test("should assert formatted URLs", () => {
  const schema = pipe(string(), isURL());

  const correct = [
    `https://domain.com`,
    `https://sub.domain.com`,
    `https://sub.domain.com/path?param=value`,
    `https://1234domain.com`,
  ];

  const invalid = [
    ``,
    `invalid`,
    `https://`,
    `//domain.com`,
  ];

  for (const url of correct) {
    assertEquals(schema.check(url, context), url);
  }

  for (const url of invalid) {
    assertIsError(schema.check(url, context));
  }
});
