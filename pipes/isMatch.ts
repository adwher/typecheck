import { SchemaContext } from "../context.ts";
import { error } from "../errors.ts";

/**
 * Create a pipe that validates the `value` as the specified regular expression.
 * @example ```
 * const PasswordSchema = string(isMatch(/\w{8,}/i));
 * ```
 */
export function isMatch(
  regex: RegExp,
  message = `Must match with "${regex}" expression`,
) {
  return function (value: string, context: SchemaContext) {
    if (regex.test(value)) {
      return value;
    }

    return error(context, { message });
  };
}
