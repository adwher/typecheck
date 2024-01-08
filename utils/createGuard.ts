import { Schema } from "../schema.ts";

/**
 * Creates a new function guard that checks values with the given `schema`.
 * @returns A function guard that checks the `value` as `schema`.
 */
export function createGuard<T>(schema: Schema<T>) {
  return function (value: unknown): value is T {
    const commit = schema.check(value, { verbose: false });
    return commit === undefined || commit.success;
  };
}
