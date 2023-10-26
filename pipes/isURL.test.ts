import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { pipe, string } from "../schemas/mod.ts";
import { createContext } from "../context.ts";
import { isURL } from "./isURL.ts";

const context = createContext();

Deno.test("assert formatted URLs", () => {
  const schema = pipe(string(), isURL());

  const correct = [
    `https://domain.com`,
    `https://sub.domain.com`,
    `https://sub.domain.com/path?param=value`,
    `https://123domain.com`,
  ];

  const incorrect = [``, `incorrect`, `https://`, `//domain.com`];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
