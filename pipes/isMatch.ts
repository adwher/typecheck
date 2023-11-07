import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

/**
 * Create a pipe that validates the `value` as the specified regular expression.
 */
export function isMatch(
  regex: RegExp,
  message = `Must match with "${regex}" expression`,
) {
  return function (value: string, context: SchemaContext) {
    if (regex.test(value)) {
      return value;
    }

    return createError(context, { message });
  };
}
