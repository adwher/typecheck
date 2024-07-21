import { assertObjectMatch } from "assert/mod.ts";
import { merge, number, object, string } from "../schemas.ts";

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
