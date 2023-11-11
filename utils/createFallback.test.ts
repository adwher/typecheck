import { assert, assertEquals } from "assert/mod.ts";
import { createFallback } from "./createFallback.ts";

Deno.test("should use the fixed fallback", () => {
  const fallback = createFallback(true);
  assertEquals(fallback, true);
});

Deno.test("should generate a fallback", () => {
  const fallback = createFallback(() => Math.random());
  assert(typeof fallback === "number");
});
