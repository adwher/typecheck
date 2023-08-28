import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";

const ERROR_MESSAGE = "Must be a positive number";

/**
 * Check the `value` as a positive number.
 * @example ```ts
 * const PositiveSchema = number(isPositive());
 * ```
 */
export function isPositive(message = ERROR_MESSAGE) {
  return function (value: number, context: SchemaContext) {
    if (value >= 0) {
      return value;
    }

    return error(context, { message });
  };
}