import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { enumerated } from "./mod.ts";

const context = createContext();

Deno.test("should assert with the given options", () => {
  const schema = enumerated("hello", "hola", "hallo");

  const correct: unknown[] = ["hello", "hola", "hallo"];
  const incorrect = ["bye", "adios", 1234, null, true, false, [], {}];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
