import { assertEquals } from "std/assert/assert_equals.ts";
import { assertInstanceOf } from "std/assert/assert_instance_of.ts";
import { assertObjectMatch } from "std/assert/assert_object_match.ts";

import { SchemaContext } from "../context.ts";
import { string } from "./string.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass string values", () => {
  const received = "hey";

  const schema = string();
  const output = schema.check(received, context);

  assertEquals(output, received);
});

Deno.test("should discard non-string values", () => {
  const received = true;

  const schema = string();
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});

Deno.test("should return an issue path", () => {
  const context: SchemaContext = { path: ["parent"] };
  const received = 123;

  const schema = string();
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
  assertObjectMatch(output.first(), { path: ["parent"] });
});

Deno.test("should execute tranformer string pipes", () => {
  const received = "hello";
  const expected = "HELLO";

  const schema = string((value) => value.toUpperCase());
  const output: unknown = schema.check(received, context);

  assertEquals(output, expected);
});

Deno.test("should execute validation string pipes", () => {
  const received = "hey";

  const shouldBeHello = (value: string) => {
    if (value === "hello") {
      return value;
    }

    return new SchemaError({ ...context });
  };

  const schema = string(shouldBeHello);
  const output: unknown = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});
