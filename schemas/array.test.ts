import {
  assertEquals,
  assertIsError,
  assertObjectMatch,
} from "std/assert/mod.ts";

import { createContext } from "../context.ts";
import { array } from "./array.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";

const context = createContext();

Deno.test("should pass array values", () => {
  const schema = array(number());

  assertEquals(schema.check([1, 2, 3], context), [1, 2, 3]);
  assertEquals(schema.check([2, 4, 6], context), [2, 4, 6]);

  assertIsError(schema.check("hello", context), SchemaError);
  assertIsError(schema.check([true, false], context), SchemaError);
});

Deno.test("should return an issue path correctly", () => {
  const schema = array(number());
  const output = schema.check([1, 2, false], context);

  assertIsError(output, SchemaError);
  assertObjectMatch(output.first(), { path: [2] });
});
