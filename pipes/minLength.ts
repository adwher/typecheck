import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

/**
 * Create a pipe that validates the `length` of the given `value`.
 * @example ```ts
 * const MessageSchema = pipe(string(), minLength(1));
 * ```
 * @example ```ts
 * const StackSchema = pipe(array(BlockSchema), maxLength(1));
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

    return createError(context, { message });
  };
}
