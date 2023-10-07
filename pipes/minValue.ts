import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

/**
 * Create a pipe that validates the `value`.
 * @example ```ts
 * const AgeSchema = pipe(number(), minValue(0));
 * ```
 */
export function minValue(
  expected: number,
  message = `Must be higher than ${expected}`,
) {
  return function (value: number, context: SchemaContext) {
    if (value > expected) {
      return value;
    }

    return createError(context, { message });
  };
}
