import { error } from "../errors.ts";
import { SchemaPipe } from "../pipes.ts";

const ERROR_MESSAGE = "Must be a integer number";

/**
 * Check the `value` as a integer number using the `Number.isInteger` function.
 * @example ```ts
 * const CountSchema = number(isInteger());
 * ```
 */
export function isInteger(message = ERROR_MESSAGE): SchemaPipe<number> {
  return function (value, context) {
    if (Number.isInteger(value)) {
      return value;
    }

    return error(context, { message });
  };
}
