import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { object, strict, string } from "./mod.ts";
import { createContext } from "../context.ts";

const context = createContext();

Deno.test("should strict the schema shape", () => {
  const schema = strict(object({ hello: string() }));

  // Yep, only one schema should be allowed
  assertEquals(schema.check({ hello: "world" }, context), { hello: "world" });

  const incorrect = [{ hello: "world", hola: "mundo" }, { oops: "sorry!" }];

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
