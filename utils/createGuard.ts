import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";

/**
 * Creates a new function guard that checks values with the given `schema`.
 * @returns A function guard that checks the `value` as `schema`.
 */
export function createGuard<T>(schema: Schema<T>) {
  const context = createContext();

  return function (value: unknown): value is T {
    const data = schema.check(value, context);
    const hasError = data instanceof SchemaError;

    return !hasError;
  };
}
