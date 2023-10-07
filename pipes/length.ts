import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

/**
 * Create a pipe that validates the `length` of the given `value` to be equal to `expected`.
 * @example ```ts
 * const IdentifierSchema = pipe(string(), length(16));
 * ```
 */
export function length<T extends string | unknown[]>(
  expected: number,
  message = `Length must be ${expected}`,
) {
  return function (value: T, context: SchemaContext) {
    if (value.length === expected) {
      return value;
    }

    return createError(context, { message });
  };
}
