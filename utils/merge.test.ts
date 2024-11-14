import { assertObjectMatch, assertThrows } from "@std/assert";
import type { Schema } from "../schema.ts";
import { number, object, string } from "../schemas.ts";
import { merge } from "./merge.ts";

Deno.test("merge object schemas with different keys", () => {
  const schema = merge(
    object({ a: string() }),
    object({ b: string() }),
  );

  assertObjectMatch(schema.shape, { a: string(), b: string() });
});

Deno.test("merge object schemas with overlapping keys", () => {
  const schema = merge(
    object({ a: string() }),
    object({ a: number() }),
  );

  assertObjectMatch(schema.shape, { a: number() });
});

Deno.test("throws when initial schema is not an instance of 'SchemaObject'", () => {
  const a = string() as Schema<object>;
  const b = object({ a: string() });

  assertThrows(() => merge(a, b));
});

Deno.test("throws when extension schema is not an instance of 'SchemaObject'", () => {
  const a = object({ a: string() });
  const b = string() as Schema<object>;

  assertThrows(() => merge(a, b));
});
