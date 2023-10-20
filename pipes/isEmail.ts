import { isMatch } from "./isMatch.ts";

const REGEX = /^[A-Z0-9._%+-]+@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const ERROR_MESSAGE = "Must be a valid email";

/**
 * Check the `value` as an email.
 * @example ```ts
 * const EmailSchema = pipe(string(), isEmail());
 * ```
 */
export function isEmail(message = ERROR_MESSAGE) {
  return isMatch(REGEX, message);
}
