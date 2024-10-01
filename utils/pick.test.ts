import { assertObjectMatch, assertThrows } from "@std/assert";
import type { Schema } from "../schema.ts";
import { number, object, string } from "../schemas.ts";
import { pick } from "./pick.ts";

Deno.test("pick the given fields on the shape", () => {
  const schema = object({ a: string(), b: number(), c: string() });
  const omitted = pick(schema, ["a", "b"]);

  assertObjectMatch(omitted.shape, { a: string(), b: number() });
});

Deno.test("throws when the given schema is not an instance of 'SchemaObject'", () => {
  assertThrows(() => pick(string() as Schema<object>, []));
});
