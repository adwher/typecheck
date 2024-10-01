import { assertObjectMatch, assertThrows } from "@std/assert";
import type { Schema } from "../schema.ts";
import { number, object, string } from "../schemas.ts";
import { merge } from "./merge.ts";

Deno.test("merge object schemas", () => {
  const schema = merge(
    object({ a: string() }),
    object({ b: string() }),
  );

  assertObjectMatch(schema.shape, { a: string(), b: string() });
});

Deno.test("override with the last schema", () => {
  const schema = merge(
    object({ a: string() }),
    object({ a: number() }),
  );

  assertObjectMatch(schema.shape, { a: number() });
});

Deno.test("throws when the given schema is not an instance of 'SchemaObject'", () => {
  const schema = string() as Schema<object>;
  assertThrows(() => merge(schema, schema));
});
