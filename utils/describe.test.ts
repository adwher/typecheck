import { assertEquals } from "@std/assert";
import type { Schema } from "../schema.ts";
import { describe } from "./describe.ts";
import { number, string } from "../schemas.ts";

Deno.test("describe should add a description to the schema", () => {
  const schema: Schema = describe("ID of the user", string());
  assertEquals(schema.description, "ID of the user");
});

Deno.test("describe should return the same schema instance", () => {
  const originalSchema = string();
  const describedSchema = describe("ID of the user", originalSchema);
  assertEquals(originalSchema, describedSchema);
});

Deno.test("describe should work with different schema types", () => {
  const stringSchema: Schema = describe("Name of the user", string());
  assertEquals(stringSchema.description, "Name of the user");

  const numberSchema: Schema = describe("Age of the user", number());
  assertEquals(numberSchema.description, "Age of the user");
});
