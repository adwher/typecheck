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
