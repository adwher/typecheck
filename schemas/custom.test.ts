import { assertEquals, assertIsError } from "std/assert/mod.ts";
import { custom } from "./custom.ts";
import { isStr } from "../types.ts";

import { createContext } from "../context.ts";

type Distance = `${string}${"cm" | "m" | "km"}`;

const isDistance = (value: unknown) => {
  const regex = /(\d+)[cm|m|km]/i;
  return isStr(value) && regex.test(value);
};

const context = createContext();
const schema = custom<Distance>(isDistance);

Deno.test("pass only distances", () => {
  const correct: unknown[] = ["1m", "10cm", "100km"];
  const incorrect = [1234, "1234", "km", "-cm"];

  for (const example of correct) {
    assertEquals(schema.check(example, context), example);
  }

  for (const example of incorrect) {
    assertIsError(schema.check(example, context));
  }
});
