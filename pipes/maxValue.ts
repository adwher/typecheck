import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";

/**
 * Create a pipe that validates the `value`.
 * @example ```
 * const HexSchema = number(maxValue(255));
 * ```
 */
export function maxValue(
  expected: number,
  message = `Must be lower than ${expected}`,
) {
  return function (value: number, context: SchemaContext) {
    if (value < expected) {
      return value;
    }

    return error(context, { message });
  };
}
