import { type CheckOption, type Schema, success } from "../schema.ts";

/**
 * Check the `value` with the given `schema` and return the result.
 * @returns Object with the validation of the given `schema`.
 */
export function safeParse<T>(
  value: unknown,
  schema: Schema<T>,
): CheckOption<T> {
  const commit = schema.check(value, { verbose: true, strict: false });

  if (commit === undefined) {
    return success(value as T);
  }

  return commit;
}
