/** Check the `value` as `string`. */
export function isStr(value: unknown): value is string {
  return typeof value === "string";
}

/** Check the `value` as `number`. */
export function isNum(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

/** Check the `value` as `boolean`. */
export function isBool(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/** Check the `value` as `function`. */
export function isFn<F extends { (): void }>(value: unknown): value is F {
  return typeof value === "function";
}

/** Check the `value` as an `object` like `T`. */
export function isObj<T extends object>(value: unknown): value is T {
  return typeof value === "object" && !isArr(value);
}

/** Check the `value` as an array of `T`. */
export function isArr<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export type Instanciable = abstract new () => void;

/** Check the `value` as an extension (or instance) of `Error`. */
export function isError<E extends Error = Error>(value: unknown): value is E {
  return value instanceof Error;
}

/** Allow to merge two elements from `L` to `R`. */
export type Override<L, R> = Omit<L, keyof R> & R;

/** Allow to intersect two elements from `L` to `R`. */
export type Intersect<L, R> = {
  [K in keyof L & keyof R]: L[K] | R[K];
};