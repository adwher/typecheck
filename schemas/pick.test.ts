import { assertObjectMatch } from "assert/mod.ts";
import { number, object, pick, string } from "./mod.ts";

Deno.test("pick the given fields on the shape", () => {
  const schema = object({ a: string(), b: number(), c: string() });
  const omitted = pick(schema, ["a", "b"]);

  assertObjectMatch(omitted.shape, { a: string(), b: number() });
});
