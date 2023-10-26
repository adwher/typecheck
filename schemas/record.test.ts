import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { number, record } from "./mod.ts";

const context = createContext();
const schema = record(number());

Deno.test("should allow only the given schema", () => {
  const correct: unknown[] = [{ one: 1 }, { thousand: 1000 }];
  const incorrect = [{ 123: "123" }, "hello", 1234, true, false, null, []];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
