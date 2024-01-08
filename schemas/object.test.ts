import { assertObjectMatch } from "assert/mod.ts";
import { number, object, string } from "./mod.ts";
import { safeParse } from "../utils/mod.ts";

Deno.test("allows object values", () => {
  const schema = object({ a: string() });

  const correct = [{ a: "hello" }, { a: "world" }];
  const incorrect = ["hello", 1234, null, false, true, [], {}];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("respect the given shape", () => {
  const schema = object({
    title: string(),
    description: string(),
    reads: number(),
  });

  const correct = [
    { title: "Post #1", description: "Lorem", reads: 1 },
    { title: "Post #2", description: "Lorem", reads: 2 },
    { title: "Post #3", description: "Lorem", reads: 3 },
  ];

  const incorrect = [
    { title: "Post #1", description: "Lorem", reads: true },
    { title: "Post #1", description: null, reads: 10 },
    { title: [], description: "Lorem", reads: 10 },
  ];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("return an issue with the right path", () => {
  const schema = object({ a: string() });
  const commit = safeParse({ a: null }, schema);

  assertObjectMatch(commit, { success: false, issues: [{ position: "a" }] });
});
