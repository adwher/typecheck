import type { Pipe } from "../schemas.ts";
import { isMatch } from "./isMatch.ts";

const REGEX: RegExp = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])$/u;

/**
 * Checks if a string matches the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format for date.
 * @returns A pipe that checks if a string matches the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date format.
 */
export function isDate(): Pipe<string> {
  return isMatch(REGEX);
}
