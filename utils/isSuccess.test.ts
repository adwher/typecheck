import { assert } from "assert/mod.ts";
import { isSuccess } from "./isSuccess.ts";

Deno.test("should return true for a valid success object", () => {
  const commit = isSuccess({ success: true, value: "Hello, World!" });
  assert(commit);
});

Deno.test("should return false for an invalid success object", () => {
  const commit = isSuccess({ success: false });
  assert(!commit);
});

Deno.test("should return false for a non-success object", () => {
  const commit = isSuccess({ foo: "bar" });
  assert(!commit);
});
