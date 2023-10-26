import {
  assertEquals,
  assertIsError,
  assertObjectMatch,
} from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, object, string } from "./mod.ts";

const context = createContext();

Deno.test("allows object values", () => {
  const schema = object({ a: string() });

  const correct = [{ a: "hello" }, { a: "world" }];
  const incorrect = ["hello", 1234, null, false, true, [], {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
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
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});

Deno.test("return an issue with the right path", () => {
  const schema = object({ a: string() });
  const output = schema.check({ a: null }, context);

  assertIsError(output);
  assertObjectMatch(output.first(), { path: ["a"] });
});
