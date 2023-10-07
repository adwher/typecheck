import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

const ERROR_MESSAGE = "Must be a negative number";

/**
 * Check the `value` as a negative number.
 * @example ```ts
 * const NegativeSchema = pipe(number(), isNegative());
 * ```
 */
export function isNegative(message = ERROR_MESSAGE) {
  return function (value: number, context: SchemaContext) {
    if (value < 0) {
      return value;
    }

    return createError(context, { message });
  };
}
