import { error } from "../errors.ts";
import { SchemaPipe } from "../pipes.ts";

const ERROR_MESSAGE = "Must be higher than the given value";

/**
 * Create a pipe that validates the `value`.
 * @example ```
 * const AgeSchema = number(minValue(0));
 * ```
 */
export function minValue(
  expected: number,
  message = ERROR_MESSAGE,
): SchemaPipe<number> {
  return function (value, context) {
    if (value > expected) {
      return value;
    }

    return error(context, { message });
  };
}
