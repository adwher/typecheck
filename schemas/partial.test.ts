import { assertIsError, assertObjectMatch } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { object, partial, string } from "./mod.ts";

const context = createContext();

Deno.test(`should allow "undefined" the object schema`, () => {
  const schema = partial(object({ hello: string() }));

  const correct = [{ hello: undefined }, { hello: "word!" }];
  const incorrect = [{ hello: 1234 }, { hello: null }];

  for (const example of correct) {
    assertObjectMatch(schema.check(example, context), { ...example });
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
