import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { isStr } from "../types.ts";
import { custom } from "./mod.ts";

const context = createContext();

Deno.test("should assert with the given validation", () => {
  type Distance = `${string}${"cm" | "m" | "km"}`;

  const isDistance = (value: unknown) => {
    const regex = /(\d+)[cm|m|km]/i;
    return isStr(value) && regex.test(value);
  };

  const schema = custom<Distance>(isDistance);

  const correct: unknown[] = ["1m", "10cm", "100km"];
  const incorrect = [1234, "1234", "km", "-cm"];

  for (const received of correct) {
    assertEquals(schema.check(received, context), received);
  }

  for (const received of incorrect) {
    assertIsError(schema.check(received, context));
  }
});
