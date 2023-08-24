import { error } from "../errors.ts";
import { SchemaPipe } from "../pipes.ts";

const ERROR_MESSAGE = "Must be lower than the given value";

/**
 * Create a pipe that validates the `value`.
 * @example ```
 * const HexSchema = number(maxValue(255));
 * ```
 */
export function maxValue(
  expected: number,
  message = ERROR_MESSAGE,
): SchemaPipe<number> {
  return function (value, context) {
    if (value < expected) {
      return value;
    }

    return error(context, { message });
  };
}
