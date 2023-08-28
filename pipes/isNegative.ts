import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";

const ERROR_MESSAGE = "Must be a negative number";

/**
 * Check the `value` as a negative number.
 * @example ```ts
 * const NegativeSchema = number(isNegative());
 * ```
 */
export function isNegative(message = ERROR_MESSAGE) {
  return function (value: number, context: SchemaContext) {
    if (value < 0) {
      return value;
    }

    return error(context, { message });
  };
}
