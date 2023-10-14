import { assertEquals } from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { memoized } from "./memoized.ts";
import { unknown } from "./unknown.ts";
import { array } from "./array.ts";
import { number } from "./number.ts";
import { object } from "./object.ts";
import { string } from "./string.ts";

const context = createContext();

Deno.test("should memoize returned values", () => {
  const schema = memoized(unknown());

  const received = ["hello", 1234, true, null];

  for (const value of received) {
    assertEquals(schema.has(value), false);
    assertEquals(schema.check(value, context), value);
    assertEquals(schema.has(value), true);
  }
});

Deno.test("should support array type as keys", () => {
  const schema = memoized(array(number()));

  const received = [1, 2, 3, 4];
  const expected = [1, 2, 3, 4];

  assertEquals(schema.has(expected), false);
  assertEquals(schema.check(received, context), received);
  assertEquals(schema.has(expected), true);
});

Deno.test("should support object type as keys", () => {
  const schema = memoized(object({ hello: string() }));

  const received = { hello: "world" };
  const expected = { hello: "world" };

  assertEquals(schema.has(expected), false);
  assertEquals(schema.check(received, context), received);
  assertEquals(schema.has(expected), true);
});
