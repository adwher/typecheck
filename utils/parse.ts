import { Schema } from "../schema.ts";

/**
 * Parse the `value` with the given `schema` and return the result.
 * @throws An error in cases where the `value` does not satisfies the `schema`.
 * @returns Parsed `value` with the given `schema`.
 */
export function parse<T>(value: unknown, schema: Schema<T>): T {
  const commit = schema.check(value, { verbose: true });

  if (commit === undefined) {
    return value as T;
  }

  if (commit.success === false) {
    throw commit;
  }

  return commit.value;
}
