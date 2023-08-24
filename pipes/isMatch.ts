import { error } from "../errors.ts";
import { SchemaPipe } from "../pipes.ts";

const ERROR_MESSAGE = "Must match with the given regular expression";

/**
 * Create a pipe that validates the `value` as the specified regular expression.
 * @example ```
 * const PasswordSchema = string(isMatch(/\w{8,}/i));
 * ```
 */
export function isMatch(
  regex: RegExp,
  message = ERROR_MESSAGE,
): SchemaPipe<string> {
  return function (value, context) {
    if (regex.test(value)) {
      return value;
    }

    return error(context, { message });
  };
}
