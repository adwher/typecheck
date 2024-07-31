import type { Schema } from "../schema.ts";

/**
 * Checks the `value` with the given `schema`.
 * @returns Object with the validation of the given `schema`.
 */
export function check<T>(
  value: unknown,
  schema: Schema<T>,
): value is T {
  const commit = schema.check(value, { verbose: false });
  return commit === undefined || commit.success;
}
