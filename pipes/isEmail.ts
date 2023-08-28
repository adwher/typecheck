import { isMatch } from "./isMatch.ts";

const REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
const ERROR_MESSAGE = "Must be a valid email";

/**
 * Check the `value` as an email.
 * @example ```
 * const EmailSchema = string(isEmail());
 * ```
 */
export function isEmail(message = ERROR_MESSAGE) {
  return isMatch(REGEX, message);
}
