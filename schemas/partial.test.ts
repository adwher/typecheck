import { assertIsError, assertObjectMatch } from "std/assert/mod.ts";
import { object, partial, string } from "./mod.ts";
import { createContext } from "../context.ts";

const context = createContext();

Deno.test("strict the schema shape", () => {
  const schema = partial(object({ hello: string() }));

  const correct = [{ hello: undefined }, { hello: "word!" }];
  const incorrect = [{ hello: 1234 }, { hello: null }];

  for (const example of correct) {
    assertObjectMatch(schema.check(example, context), { ...example });
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
