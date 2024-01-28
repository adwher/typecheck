import { failure } from "../schema.ts";

/**
 * Create a pipe that validates the `value` as the specified regular expression.
 */
export function isMatch(regex: RegExp) {
  return function (value: string) {
    if (regex.test(value)) {
      return value;
    }

    return failure({
      reason: "VALIDATION",
      expected: regex,
      received: value,
    });
  };
}
