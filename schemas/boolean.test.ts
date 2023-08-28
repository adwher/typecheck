import { assertEquals } from "std/assert/assert_equals.ts";
import { assertInstanceOf } from "std/assert/assert_instance_of.ts";
import { assertObjectMatch } from "std/assert/assert_object_match.ts";

import { SchemaContext } from "../context.ts";
import { boolean } from "./boolean.ts";
import { SchemaError } from "../errors.ts";

const context: SchemaContext = { path: [] };

Deno.test("should pass boolean values", () => {
  const received = true;

  const schema = boolean();
  const output = schema.check(received, context);

  assertEquals(output, received);
});

Deno.test("should discard non-boolean values", () => {
  const received = "";

  const schema = boolean();
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});

Deno.test("should return an issue path", () => {
  const context: SchemaContext = { path: ["parent"] };
  const received = 123;

  const schema = boolean();
  const output = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
  assertObjectMatch(output.first(), { path: ["parent"] });
});

Deno.test("should execute tranformer boolean pipes", () => {
  const received = true;

  const schema = boolean((value) => !value);
  const output: unknown = schema.check(received, context);

  assertEquals(output, !received);
});

Deno.test("should execute validation boolean pipes", () => {
  const received = false;

  const shouldBeThruth = (value: boolean) => {
    if (value) {
      return value;
    }

    return new SchemaError({ ...context });
  };

  const schema = boolean(shouldBeThruth);
  const output: unknown = schema.check(received, context);

  assertInstanceOf(output, SchemaError);
});
