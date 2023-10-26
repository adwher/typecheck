import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, record } from "./mod.ts";

const context = createContext();
const schema = record(number());

Deno.test("allow only the given key-value", () => {
  const correct: unknown[] = [{ one: 1 }, { thousand: 1000 }];
  const incorrect = [{ 123: "123" }, "hello", 1234, true, false, null, []];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
