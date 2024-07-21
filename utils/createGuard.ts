import type { Schema } from "../schema.ts";

export type Guard<T> = (value: unknown) => value is T;

/**
 * Creates a new function guard that checks values with the given `schema`.
 * @returns A function guard that checks the `value` as `schema`.
 */
export function createGuard<T>(schema: Schema<T>): Guard<T> {
  return function (value: unknown): value is T {
    const commit = schema.check(value, { verbose: false });
    return commit === undefined || commit.success;
  };
}
