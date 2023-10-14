import { assertObjectMatch } from "std/assert/mod.ts";
import { object } from "./object.ts";
import { string } from "./string.ts";
import { omit } from "./omit.ts";

Deno.test("should omit the given fields on the shape", () => {
  const schema = object({ a: string(), b: string(), c: string() });
  const omited = omit(schema, ["a", "b"]);

  assertObjectMatch(omited.shape, { c: string() });
});
