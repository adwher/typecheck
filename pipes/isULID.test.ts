import { assertObjectMatch } from "@std/assert";
import { pipe, string } from "../schemas.ts";
import { isULID } from "./isULID.ts";
import { safeParse } from "../utils.ts";

Deno.test("assert formatted ULIDs", () => {
  const schema = pipe(string(), isULID());

  const correct = [
    `01BX5ZZKBKACTAV9WEVGEMMVRZ`,
    `01BX5ZZKBKACTAV9WEVGEMMVS0`,
    `01BX5ZZKBKACTAV9WEVGEMMVRY`,
  ];

  const incorrect = [
    ``,
    `incorrect`,
    `01ARZ3NDEKTSV4RRFFQ69G5FA`,
    `01ARZ3NDEKTSV4RRFFQ69G5FAVZ`,
    `&1ARZ3NDEKTSV4RRFFQ69G5FAV`,
  ];

  for (const received of correct) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: true, value: received }, received);
  }

  for (const received of incorrect) {
    const commit = safeParse(received, schema);
    assertObjectMatch(commit, { success: false }, received);
  }
});
