import { assertEquals } from "std/assert/assert_equals.ts";
import { assertInstanceOf } from "std/assert/assert_instance_of.ts";
import { assertObjectMatch } from "std/assert/assert_object_match.ts";

import { SchemaContext } from "../context.ts";
import { number } from "./number.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass number values", () => {
  const received = 1234;

  const schema = number();
  const output = schema.check(received, context);

  assertEquals(output, received);
});

Deno.test("should discard non-number values", () => {
  const received = "";

  const schema = number();
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});

Deno.test("should return an issue path", () => {
  const context: SchemaContext = { path: ["parent"] };
  const received = false;

  const schema = number();
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
  assertObjectMatch(output.first(), { path: ["parent"] });
});

Deno.test("should execute tranformer number pipes", () => {
  const received = 2;
  const expected = 4;

  const schema = number((value) => value * 2);
  const output: unknown = schema.check(received, context);

  assertEquals(output, expected);
});

Deno.test("should execute validation number pipes", () => {
  const received = 1;

  const shouldBeTwo = (value: number) => {
    if (value === 2) {
      return value;
    }

    return new SchemaError({ ...context });
  };

  const schema = number(shouldBeTwo);
  const output: unknown = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});
