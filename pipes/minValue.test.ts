import { assertObjectMatch } from "assert/mod.ts";
import { number, pipe } from "../schemas.ts";
import { minValue } from "./minValue.ts";
import { date, safeParse } from "../mod.ts";

Deno.test("restrict the allowed numbers", () => {
  const schema = pipe(number(), minValue(2));

  const correct = [3, 4, 5];
  const incorrect = [0, 1, 2];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});

Deno.test("restrict the allowed dates", () => {
  const schema = pipe(date(), minValue(new Date("2022-01-01")));

  const correct = [
    new Date("2022-01-02"),
    new Date("2022-01-03"),
  ];

  const incorrect = [
    new Date("2021-01-01"),
    new Date("2021-12-31"),
    new Date("2022-01-01"),
  ];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received });
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false });
  }
});
