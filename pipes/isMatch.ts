import { SchemaContext } from "../context.ts";
import { createError } from "../errors.ts";

/**
 * Create a pipe that validates the `value` as the specified regular expression.
 * @example ```ts
 * const PasswordSchema = pipe(string(), isMatch(/\w{8,}/i));
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

    return createError(context, { message });
  };
}
