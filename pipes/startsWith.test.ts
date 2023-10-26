import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { pipe, string } from "../schemas/mod.ts";
import { SchemaContext } from "../context.ts";
import { startsWith } from "./startsWith.ts";

const context: SchemaContext = { path: [] };

Deno.test("starts with the specified search", () => {
  const schema = pipe(string(), startsWith("abc"));

  const correct = [
    `abc`,
    `abc123`,
    `abcd`,
    `abcd123`,
  ];

  const incorrect = [
    ``,
    `ab`,
    `ac`,
    `abC`,
    `ABC`,
    `a1234`,
  ];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
