import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { isURL } from "./isURL.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert formatted URLs", () => {
  const schema = pipe(string(), isURL());

  const correct = [
    `https://domain.com`,
    `https://sub.domain.com`,
    `https://sub.domain.com/path?param=value`,
    `https://123domain.com`,
  ];

  const incorrect = [``, `incorrect`, `https://`, `//domain.com`];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
