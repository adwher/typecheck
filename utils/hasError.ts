import { createContext } from "../context.ts";
import { SchemaError } from "../errors.ts";
import { Schema } from "../schema.ts";

/**
 * Check the `value` with the given `schema`.
 * @returns A `Boolean` that checks whether the `value` has an error.
 * @example ```ts
 * if (hasError(data, CreateUserSchema)) {
 *   throw new Error(`"data" is not an user`);
 * }
 *
 * const user = await createUser(data);
 * ```
 */
export function hasError<T>(
  value: unknown,
  schema: Schema<T>,
): value is SchemaError {
  const context = createContext();

  const data = schema.check(value, context);
  const hasError = data instanceof SchemaError;

  return hasError;
}
