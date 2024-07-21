import type { Context } from "./context.ts";
import type { Issue } from "./errors.ts";
import { isArr } from "./types.ts";

/** Use when the `value` satisfies the `schema`. */
export interface Success<T> {
  success: true;
  /** Output after validation of the schema. */
  value: T;
}

/** Creates a new {@linkcode Success} instance for the given `value as T`. */
export function success<T>(value: T): Success<T> {
  return {
    success: true,
    value,
  };
}

/** Use when the `value` not satisfies the `schema`. */
export interface Failure {
  success: false;
  issues: Issue[];
}

/** Creates a new {@linkcode Failure} instance for the given `issues`. */
export function failure(reason?: Issue | Issue[]): Failure {
  if (reason === undefined) {
    return { success: false, issues: [] };
  }

  return {
    success: false,
    issues: isArr(reason) ? reason : [reason],
  };
}

/** Lazy enough to create a specific failure? */
export const GENERIC_FAILURE: Failure = failure();

/**
 * Represents the possible result for the given check on a schema.
 * Every `Check` can return either `Success<T>` or `Failure`.
 * @returns `Success<T>` when the given `value` was correct.
 * @returns `Failure` when the given `value` does not satisfies the schema.
 */
export type CheckOption<T> = Success<T> | Failure;

/**
 * Represents the possible result for the given check on a schema.
 * Every `Check` can return either `Success<T>`, `Failure` or `undefined`.
 * @returns `Success<T>` when the given `value` was correct and was transformed.
 * @returns `Failure` when the given `value` does not satisfies the schema.
 * @returns `undefined` when the given `value` was correct as it is.
 */
export type Check<T> = CheckOption<T> | undefined;

/** Alias for `Check<Infer<T>>`. */
export type CheckFrom<T> = Check<Infer<T>>;

// deno-lint-ignore no-explicit-any
export interface Schema<T = any> {
  name: string;

  /** Check the given `value` using the strategy of the schema. */
  check(value: unknown, context: Context): Check<T>;
}

/** Alias for `Schema<Infer<T>>`. */
export type SchemaFrom<T> = Schema<Infer<T>>;

/** Allow to infer the exact type of a schema. */
export type Infer<T> = T extends Schema<infer U> ? U
  : T extends object ? { [K in keyof T]: Infer<T[K]> }
  : T extends (infer U)[] ? Infer<U>
  : never;

/** Resctrict the schema definition with a given type. */
export type Describe<T> = Schema<T>;
