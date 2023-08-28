import { Schema } from "../schema.ts";
import { check } from "./check.ts";

/**
 * Creates a new function guard that checks values with the given `schema`.
 * @returns A function guard that checks the `value` as `schema`.
 * @example ```ts
 * const isLogin = createGuard(LoginSchema);
 *
 * if (isLogin(data)) {
 *  const session = await signIn(data);
 * }
 * ```
 */
export function createGuard<T>(schema: Schema<T>) {
  return function (value: unknown): value is T {
    return check(value, schema);
  };
}
