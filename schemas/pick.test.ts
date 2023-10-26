import { assertObjectMatch } from "std/assert/mod.ts";
import { object } from "./object.ts";
import { string } from "./string.ts";
import { number } from "./number.ts";
import { pick } from "./pick.ts";

Deno.test("pick the given fields on the shape", () => {
  const schema = object({ a: string(), b: number(), c: string() });
  const omited = pick(schema, ["a", "b"]);

  assertObjectMatch(omited.shape, { a: string(), b: number() });
});
