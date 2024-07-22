import type { Pipe } from "../schemas.ts";
import { isMatch } from "./isMatch.ts";

const ISO8601_REGEX: RegExp =
  /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}(?:\.\d{1,9})?(?:Z|[+-](?:0\d|1\d|2[0-3])(?::?[0-5]\d)?)$/u;

/**
 * Checks if a string matches the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format.
 * @returns A pipe that checks if a string matches the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format.
 */
export function isISO8601(): Pipe<string> {
  return isMatch(ISO8601_REGEX);
}
