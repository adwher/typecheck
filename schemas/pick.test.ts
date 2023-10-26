import { assertObjectMatch } from "std/assert/mod.ts";
import { number, object, pick, string } from "./mod.ts";

Deno.test("should pick the given fields on the shape", () => {
  const schema = object({ a: string(), b: number(), c: string() });
  const omited = pick(schema, ["a", "b"]);

  assertObjectMatch(omited.shape, { a: string(), b: number() });
});
