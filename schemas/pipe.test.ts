import { assertSpyCall, spy } from "@std/testing/mock";
import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { failure } from "../schema.ts";
import { safeParse } from "../utils.ts";

Deno.test("execute all the steps", () => {
  const firstSpy = spy((value: string) => value.toUpperCase());
  const secondSpy = spy((value: string) => String(value.length));

  const schema = pipe(string(), firstSpy, secondSpy);
  const commit = safeParse("abc", schema);

  assertSpyCall(firstSpy, 0);
  assertSpyCall(secondSpy, 0);

  assertObjectMatch(commit, { success: true, value: "3" });
});

Deno.test("return given errors", () => {
  const schema = pipe(string(), () => failure());
  const commit = safeParse(null, schema);

  assertObjectMatch(commit, { success: false });
});
