import { assertObjectMatch } from "std/assert/mod.ts";
import { number, object, string } from "./mod.ts";
import { override } from "./override.ts";

Deno.test("override with the same key", () => {
  const initial = object({ a: string() });
  const extended = override(initial, { a: number() });

  assertObjectMatch(extended.shape, { a: number() });
});

Deno.test("attach new schemas", () => {
  const initial = object({ b: string() });
  const extended = override(initial, { a: number() });

  assertObjectMatch(extended.shape, { a: number(), b: string() });
});
