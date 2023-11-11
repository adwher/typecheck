import { isFn } from "../types.ts";

/**
 * Sets or generate a defaulted value for the given `schema`.
 */
export type Fallback<T> = T | (() => T);

/** Generates the given `fallback`. */
export function createFallback<T>(fallback: Fallback<T>): T {
  return isFn(fallback) ? fallback() : fallback;
}
