import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

const ERROR_MESSAGE = "Must be a positive number";

/**
 * Check the `value` as a positive number.
 */
export function isPositive(message = ERROR_MESSAGE) {
  return function (value: number, context: SchemaContext) {
    if (value >= 0) {
      return value;
    }

    return createError(context, { message });
  };
}
