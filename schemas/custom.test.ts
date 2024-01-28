import { assertObjectMatch } from "assert/mod.ts";
import { isStr } from "../types.ts";
import { custom } from "./mod.ts";
import { safeParse } from "../mod.ts";
import { failure } from "../schema.ts";

Deno.test("assert with the given validation", () => {
  type Distance = `${string}${"cm" | "m" | "km"}`;

  const isDistance = (value: unknown) => {
    const regex = /(\d+)[cm|m|km]/i;
    return isStr(value) && regex.test(value);
  };

  const schema = custom<Distance>(isDistance);

  const correct: unknown[] = ["1m", "10cm", "100km"];
  const incorrect = [1234, "1234", "km", "-cm"];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("return on failure", () => {
  const schema = custom(() => failure());

  const commit = safeParse(null, schema);
  assertObjectMatch(commit, { success: false });
});
