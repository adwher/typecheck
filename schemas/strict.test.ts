import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { createContext } from "../context.ts";
import { object, strict, string } from "./mod.ts";

const context = createContext();

Deno.test("should assert with the given schema", () => {
  const schema = strict(object({ hello: string() }));
  const incorrect = [{ hello: "world", hola: "mundo" }, { oops: "sorry!" }];

  // Yep, only one schema be allowed
  assertEquals(schema.check({ hello: "world" }, context), { hello: "world" });

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
