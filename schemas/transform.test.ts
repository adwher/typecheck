import { assertSpyCall, spy } from "testing/mock.ts";
import { assertObjectMatch } from "assert/mod.ts";
import { string, transform } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test("execute the transformer", () => {
  const transformer = spy((value: string) => value.length);

  const schema = transform(string(), transformer);
  const commit = safeParse("abc", schema);

  assertSpyCall(transformer, 0);

  assertObjectMatch(commit, { success: true, value: 3 });
});

Deno.test("return given errors", () => {
  const schema = transform(string(), (value) => value.length);

  assertObjectMatch(safeParse(null, schema), { success: false });
  assertObjectMatch(safeParse(1234, schema), { success: false });
});
