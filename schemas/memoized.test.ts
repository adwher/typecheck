import { assertEquals } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { memoized, unknown } from "./mod.ts";

const context = createContext();

Deno.test("should memoize previous values", () => {
  const schema = memoized(unknown());

  const received = ["hello", 1234, true, null];

  for (const value of received) {
    assertEquals(schema.has(value), false);
    assertEquals(schema.check(value, context), value);
    assertEquals(schema.has(value), true);
  }
});
