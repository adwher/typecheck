import { assertObjectMatch } from "std/assert/mod.ts";
import { merge, number, object, string } from "./mod.ts";

Deno.test("should merge object schemas", () => {
  const schema = merge(
    object({ a: string() }),
    object({ b: string() }),
  );

  assertObjectMatch(schema.shape, { a: string(), b: string() });
});

Deno.test("should override with the last schema", () => {
  const schema = merge(
    object({ a: string() }),
    object({ a: number() }),
  );

  assertObjectMatch(schema.shape, { a: number() });
});
