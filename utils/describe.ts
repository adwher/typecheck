import type { Schema } from "../schema.ts";

/**
 * Adds a description to the given schema.
 * Useful for documentation purposes or working with AI tools.
 * @param description - The description to add to the schema.
 * @param schema - The schema to which the description will be added.
 * @returns The schema with the added description.
 *
 * @example ```ts
 * const schema = describe("ID of the user", string());
 * ```
 */
export function describe<S extends Schema>(
  description: string,
  schema: S,
): S {
  schema.description = description;
  return schema;
}
