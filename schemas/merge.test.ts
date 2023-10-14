import { assertObjectMatch } from "std/assert/mod.ts";
import { object } from "./object.ts";
import { string } from "./string.ts";
import { merge } from "./merge.ts";
import { number } from "./number.ts";

Deno.test("should merge object schemas", () => {
  const mergedSchema = merge(
    object({ a: string() }),
    object({ b: string() }),
  );

  assertObjectMatch(mergedSchema.shape, { a: string(), b: string() });
});

Deno.test("should override with the last schema", () => {
  const mergedSchema = merge(
    object({ a: string() }),
    object({ a: number() }),
  );

  assertObjectMatch(mergedSchema.shape, { a: number() });
});
