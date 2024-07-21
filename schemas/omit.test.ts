import { assertObjectMatch } from "assert/mod.ts";
import { object, omit, string } from "../schemas.ts";

Deno.test("omit the given fields on the shape", () => {
  const schema = object({ a: string(), b: string(), c: string() });
  const omitted = omit(schema, ["a", "b"]);

  assertObjectMatch(omitted.shape, { c: string() });
});
