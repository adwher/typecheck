import { SchemaContext } from "../context.ts";
import { Schema } from "../schema.ts";

/**
 * Check the `value` with the given `schema`.
 * @returns A `Boolean` that checks the `value` as `schema`.
 * @example ```ts
 * if (check(data, CreateUserSchema)) {
 *  const user = await createUser(data);
 * }
 * ```
 */
export function check<T>(value: unknown, schema: Schema<T>): value is T {
  const context: SchemaContext = { path: [] };

  const data = schema.check(value, context);
  const hasError = data instanceof Error;

  return !hasError;
}
