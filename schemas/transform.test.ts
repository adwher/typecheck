import { assertSpyCall, spy } from "@std/testing/mock";
import { assertObjectMatch } from "@std/assert";
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

Deno.test("return success transformed value", () => {
  const schema = transform(
    // Transform the string to its length.
    transform(string(), (value) => value.length),
    // Transform the number into a string.
    (value) => String(value),
  );

  assertObjectMatch(safeParse("HELLO", schema), { success: true, value: "5" });
});
