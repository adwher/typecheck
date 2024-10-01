import { assertEquals } from "@std/assert";
import { string } from "../schemas.ts";
import type { Schema } from "../schema.ts";
import { describe } from "./describe.ts";

Deno.test("describe should add a description to the schema", () => {
  const schema: Schema = describe(string(), "ID of the user");
  assertEquals(schema.description, "ID of the user");
});
