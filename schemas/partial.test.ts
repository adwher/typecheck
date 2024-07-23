import { assertObjectMatch } from "assert/mod.ts";
import { object, partial, string } from "../schemas.ts";
import { safeParse } from "../utils.ts";

Deno.test(`allow "undefined" the object schema`, () => {
  const schema = partial(object({ hello: string() }));

  const correct = [{ hello: undefined }, { hello: "word!" }];
  const incorrect = [{ hello: 1234 }, { hello: null }];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
