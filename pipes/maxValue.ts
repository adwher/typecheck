import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

/**
 * Create a pipe that validates the `value`.
 */
export function maxValue(
  expected: number,
  message = `Must be lower than ${expected}`,
) {
  return function (value: number, context: SchemaContext) {
    if (value < expected) {
      return value;
    }

    return createError(context, { message });
  };
}
