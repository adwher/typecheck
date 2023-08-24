import { error } from "../errors.ts";
import { SchemaPipe } from "../pipes.ts";

const ERROR_MESSAGE = "Must be a positive number";

/**
 * Check the `value` as a positive number.
 * @example ```ts
 * const PositiveSchema = number(isPositive());
 * ```
 */
export function isPositive(message = ERROR_MESSAGE): SchemaPipe<number> {
  return function (value, context) {
    if (value > 0) {
      return value;
    }

    return error(context, { message });
  };
}
