import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";

/**
 * Create a pipe that validates the `length` of the given `value`.
 * @example ```
 * const MessageSchema = string(minLength(1));
 * ```
 */
export function minLength<T extends string | unknown[]>(
  expected: number,
  message = `Length must be higher than ${expected}`,
) {
  return function (value: T, context: SchemaContext) {
    if (value.length > expected) {
      return value;
    }

    return error(context, { message });
  };
}
