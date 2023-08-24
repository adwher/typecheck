import { error } from "../errors.ts";
import { SchemaPipe } from "../pipes.ts";

const ERROR_MESSAGE = "Must be a negative number";

/**
 * Check the `value` as a negative number.
 * @example ```ts
 * const NegativeSchema = number(isNegative());
 * ```
 */
export function isNegative(message = ERROR_MESSAGE): SchemaPipe<number> {
  return function (value, context) {
    if (value < 0) {
      return value;
    }

    return error(context, { message });
  };
}
