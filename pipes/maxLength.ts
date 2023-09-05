import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";

/**
 * Create a pipe that validates the `length` of the given `value`.
 * @example ```ts
 * const MessageSchema = pipe(string(), maxLength(280));
 * ```
 */
export function maxLength<T extends string | unknown[]>(
  expected: number,
  message = `Length must be lower than ${expected}`,
) {
  return function (value: T, context: SchemaContext) {
    if (value.length > expected) {
      return value;
    }

    return error(context, { message });
  };
}
