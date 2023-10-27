import { assertSpyCall, spy } from "testing/mock.ts";
import { assertEquals, assertIsError } from "assert/mod.ts";
import { createContext } from "../context.ts";
import { pipe, string } from "./mod.ts";
import { createError } from "../errors.ts";

const context = createContext();

Deno.test("should execute all the steps", () => {
  const firstSpy = spy((value: string) => value.toUpperCase());
  const secondSpy = spy((value: string) => String(value.length));

  const schema = pipe(string(), firstSpy, secondSpy);
  const output = schema.check("abc", context);

  assertSpyCall(firstSpy, 0);
  assertSpyCall(secondSpy, 0);

  assertEquals(output, "3");
});

Deno.test("should return given errors", () => {
  const schema = pipe(string(), () => createError(context));
  assertIsError(schema.check("A", context));
});
