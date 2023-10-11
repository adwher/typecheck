import { assertEquals, assertInstanceOf } from "std/assert/mod.ts";
import { custom } from "./custom.ts";
import { isStr } from "../types.ts";
import { SchemaError } from "../errors.ts";
import { createContext } from "../context.ts";

type Distance = `${string}${"cm" | "m" | "km"}`;

const isDistance = (value: unknown) => {
  const regex = /(\d+)[cm|m|km]/i;
  return isStr(value) && regex.test(value);
};

const context = createContext();

Deno.test("should pass only distances", () => {
  const schema = custom<Distance>(isDistance);

  assertEquals(schema.check("1m", context), "1m");
  assertEquals(schema.check("10cm", context), "10cm");
  assertEquals(schema.check("100km", context), "100km");

  assertInstanceOf(schema.check(1234, context), SchemaError);
  assertInstanceOf(schema.check("1234", context), SchemaError);
  assertInstanceOf(schema.check("km", context), SchemaError);
});
