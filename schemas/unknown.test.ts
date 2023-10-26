import { assertEquals } from "std/assert/mod.ts";
import { unknown } from "./unknown.ts";

Deno.test("return the received value", () => {
  const schema = unknown();

  const correct: unknown[] = [`hello`, `hola`, 1234, false, null, [], {}];

  for (const expected of correct) {
    assertEquals(schema.check(expected), expected);
  }
});
