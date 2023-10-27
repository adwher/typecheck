import { assert } from "assert/mod.ts";

import { string } from "../schemas/string.ts";
import { hasError } from "./hasError.ts";

Deno.test("asserts with the right value", () => {
  const schema = string();

  assert(hasError("", schema) === false);
  assert(hasError("hey there!", schema) === false);

  assert(hasError(1234, schema));
  assert(hasError(false, schema));
  assert(hasError(null, schema));
  assert(hasError([], schema));
});
