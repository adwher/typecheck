import { assertObjectMatch, assertThrows } from "@std/assert";
import type { Schema } from "../schema.ts";
import { object, string } from "../schemas.ts";
import { omit } from "./omit.ts";

Deno.test("omit the given fields on the shape", () => {
  const schema = object({ a: string(), b: string(), c: string() });
  const omitted = omit(schema, ["a", "b"]);

  assertObjectMatch(omitted.shape, { c: string() });
});

Deno.test("throws when the given schema is not an instance of 'SchemaObject'", () => {
  assertThrows(() => omit(string() as Schema<object>, []));
});
