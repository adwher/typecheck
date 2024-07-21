import { assertEquals } from "assert/mod.ts";
import { check } from "./check.ts";
import { number } from "../mod.ts";

Deno.test("should return true for valid value", () => {
  const schema = number();

  const value = 42;
  const result = check(value, schema);

  assertEquals(result, true);
});

Deno.test("should return false for invalid value", () => {
  const schema = number();

  const value = "not a number";
  const result = check(value, schema);

  assertEquals(result, false);
});
