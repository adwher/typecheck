import { failure } from "../schema.ts";
import type { Pipe } from "../schemas/pipe.ts";

export const VALIDATION_MATCH = "VALIDATION_MATCH";

/**
 * Create a pipe that validates the `value` as the specified regular expression.
 */
export function isMatch(regex: RegExp): Pipe<string> {
  return function (value: string) {
    if (regex.test(value)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      validation: VALIDATION_MATCH,
      expected: regex,
      received: value,
    });
  };
}
