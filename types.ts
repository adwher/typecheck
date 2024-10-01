// Copyright (c) 2024 Andres Celis. MIT license.

/**
 * @module types
 * This module exports simple type-checks.
 * @example
 * ```ts
 * import { isStr } from "typecheck/types";
 *
 * const value = "Hello, World!";
 *
 * assert(isStr(value));
 */

/** Allow to merge two elements from `L` to `R`. */
export type Override<L, R> = Omit<L, keyof R> & R;

/** Check the `value` as `string`. */
export function isStr(value: unknown): value is string {
  return typeof value === "string";
}

/** Check the `value` as `number`. */
export function isNum(value: unknown): value is number {
  return typeof value === "number";
}

/** Check the `value` as `boolean`. */
export function isBool(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/** Check the `value` as `function`. */
// deno-lint-ignore ban-types
export function isFn<F extends Function>(value: unknown): value is F {
  return typeof value === "function";
}

/** Check the `value` as an `object` like `T`. */
export function isObj<T extends object>(value: unknown): value is T {
  return Boolean(value) && typeof value === "object" && !isArr(value);
}

type Key = string | number | symbol;

/** Check the `value` as an `object` like `T` having the `key`. */
export function isProp<
  T extends Record<K, unknown>,
  K extends Key = keyof T,
>(value: unknown, key: K): value is T {
  return isObj<T>(value) && key in value;
}

/** Check the `value` as an array of `T`. */
export function isArr<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/** Check the `value` as an extension (or instance) of `Error`. */
export function isErr<E extends Error = Error>(value: unknown): value is E {
  return value instanceof Error;
}

/** Check the `value` as a `Date`. */
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

/**
 * Checks if a value is an instance of a specified type.
 * @param value - The value to check.
 * @param type - The constructor function of the type.
 * @returns A boolean indicating whether the value is an instance of the specified type.
 */
export function instanceOf<T>(
  value: unknown,
  // deno-lint-ignore no-explicit-any
  type: new (...args: any[]) => T,
): value is T {
  return value instanceof type;
}

/** Check the `value` as `Promise` of `T`. */
export function isPromiseLike<T = unknown>(
  value: unknown,
): value is Promise<T> {
  return isObj(value) && isFn((value as Promise<T>).then);
}
