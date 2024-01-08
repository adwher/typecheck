import { isMatch } from "./isMatch.ts";

const REGEX = /^[A-Z0-9._%+-]+@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

/**
 * Check the `value` as an email.
 */
export function isEmail() {
  return isMatch(REGEX);
}
