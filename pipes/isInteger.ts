import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

const ERROR_MESSAGE = "Must be a integer number";

/**
 * Check the `value` as a integer number using the `Number.isInteger` function.
 * @example ```ts
 * const CountSchema = pipe(number(), isInteger());
 * ```
 */
export function isInteger(message = ERROR_MESSAGE) {
  return function (value: number, context: SchemaContext) {
    if (Number.isInteger(value)) {
      return value;
    }

    return createError(context, { message });
  };
}
