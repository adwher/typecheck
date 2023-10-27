import { assertEquals } from "assert/mod.ts";
import { unknown } from "./mod.ts";

Deno.test("should assert with any value", () => {
  const schema = unknown();
  const examples: unknown[] = [`hello`, `hola`, 1234, false, null, [], {}];

  for (const example of examples) {
    assertEquals(schema.check(example), example);
  }
});
