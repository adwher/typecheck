import type { Pipe } from "../schemas.ts";
import { isMatch } from "./isMatch.ts";

const REGEX: RegExp = /^(?:0\d|1\d|2[0-3]):[0-5]\d$/u;

/**
 * Checks if a string matches the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format for time.
 * @returns A pipe that checks if a string matches the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) time format.
 */
export function isTime(): Pipe<string> {
  return isMatch(REGEX);
}
