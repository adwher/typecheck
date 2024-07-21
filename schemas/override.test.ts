import { assertObjectMatch } from "assert/mod.ts";
import { number, object, override, string } from "../schemas.ts";

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
