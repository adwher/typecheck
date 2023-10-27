import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "../schemas/mod.ts";
import { isURL } from "./isURL.ts";

const context = createContext();

Deno.test("should assert formatted URLs", () => {
  const schema = pipe(string(), isURL());

  const correct = [
    `https://domain.com`,
    `https://sub.domain.com`,
    `https://sub.domain.com/path?param=value`,
    `https://123domain.com`,
  ];

  const incorrect = [``, `incorrect`, `https://`, `//domain.com`];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
