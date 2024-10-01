import type { Schema } from "../schema.ts";

/**
 * Adds a description to the given schema.
 * Useful for documentation purposes or working with AI tools.
 * @param schema - The schema to which the description will be added.
 * @param description - The description to add to the schema.
 * @returns The schema with the added description.
 *
 * @example ```ts
 * const schema = describe(string(), "ID of the user");
 * ```
 */
export function describe<S extends Schema>(
  schema: S,
  description: string,
): S {
  schema.description = description;
  return schema;
}
