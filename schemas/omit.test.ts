import { assertObjectMatch } from "assert/mod.ts";
import { object, omit, string } from "./mod.ts";

Deno.test("omit the given fields on the shape", () => {
  const schema = object({ a: string(), b: string(), c: string() });
  const omited = omit(schema, ["a", "b"]);

  assertObjectMatch(omited.shape, { c: string() });
});
