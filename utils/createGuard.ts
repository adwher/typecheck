import type { Schema } from "../schema.ts";

/**
 * Represents a type guard function.
 * A type guard function takes an unknown value and returns a boolean indicating whether the value is of a specific type.
 * @param value The value to be checked.
 * @returns A boolean indicating whether the value is of type T.
 */
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
